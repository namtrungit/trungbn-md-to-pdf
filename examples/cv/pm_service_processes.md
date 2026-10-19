# PM Service — các process chính

Nguồn: `/home/trungbn/trungbn_work/pm-services`  
Hệ thống: MAX (Meperia Automated Exchange), còn gọi là EDI Authority.

## Hệ thống làm gì

Bệnh viện gửi purchase order. Nhà cung cấp trả acknowledgement, thông báo giao hàng và hóa đơn. MAX nhận từng file, lưu purchase order, so từng dòng, rồi hiện chỗ lệch để buyer xử lý trên một màn hình.

Ba repo làm cùng một luồng:

- **pm-transfers** (Ruby): nhận file upload, theo dõi trạng thái file.
- **pm-services** (Go, repo này): xử lý file, tính exception, API, đồng bộ search.
- **pm-frontend**: màn hình buyer.

Dữ liệu nằm ở PostgreSQL theo từng tổ chức (multi-tenant, Row Level Security). Buyer tìm purchase order và exception qua OpenSearch. Kafka nối các bước. MSS là hệ thống bệnh viện sẵn có, dùng để đối chiếu item và contract.

## Một file đi qua hệ thống thế nào

1. pm-transfers nhận upload và publish event `ProcessStarted` lên topic `pm.org.{org_code}.events`.
2. `cmd/worker-consumer` của org đó chỉ nhận `ProcessStarted`, rồi đưa vào worker pool đúng loại: 850, 855, 856, 810, threshold, exception_evaluator, opensearch_sync.
3. Processor đọc file base64, giải mã, lưu bản đã giải mã, validate, ghi PostgreSQL.
4. Xong thì publish `ProcessCompleted`. Lỗi thì `ProcessFailed`. pm-transfers dùng hai event này để cập nhật trạng thái file.
5. Thay đổi purchase order vào hàng đợi. Process `opensearch_sync` đẩy sang OpenSearch để màn hình search đọc.

Điểm cần nói đúng khi phỏng vấn: trong cấu hình hiện tại, file 850/855/856/810 được **pm-transfers bật** bằng `ProcessStarted` lúc upload. Scanner Go của các loại file này đang tắt, nên đồ thị ràng buộc trong orchestrator không chạy trên các file đó.

## 850 — Purchase order của bệnh viện

Prefix file: `PO`. Đây là đơn gốc.

`PurchaseOrderProcessor` làm lần lượt: đọc và giải mã file, validate format, parse JSON, validate cấu trúc, ghi purchase order và từng dòng, ghi history, gửi notification.

Chưa có 850 thì 855, 856 và 810 không có đơn để so.

## 855 — Acknowledgement của nhà cung cấp

Prefix file: `ACK`. Nhà cung cấp xác nhận đơn: giá, số lượng, đơn vị tính, mã hàng.

`PurchaseOrderAckProcessor` làm giống 850 đến bước parse, rồi lấy bản 855 trước của cùng purchase order (lần đầu thì không có bản cũ) và so từng dòng với đơn 850.

Exception lúc so acknowledgement:

| Key | Ý nghĩa |
| --- | --- |
| 1 | Chưa được acknowledge |
| 2 | Lệch giá |
| 3 | Lệch số lượng |
| 4 | Lệch đơn vị tính (UOM) |
| 5 | Backorder |
| 7 | Lệch mã hàng vendor |
| 8 | Lệch mã hàng manufacturer |
| 9 | Dòng purchase order không được chấp nhận |

Exception gắn ở dòng, ở detail, rồi gộp lên header của purchase order. Buyer mở một màn hình, lọc theo các lệch này và quyết định cách xử lý.

## 856 — Advance ship notice

Prefix file: `SN`. Nhà cung cấp báo hàng sắp giao hoặc đã giao.

Sau khi ghi shipment, `ASNIngestor` tính lại exception giao hàng cho các dòng trong file. Hai exception chính: **24 missing ASN** (đến hạn mà chưa có thông báo giao) và **25 late delivery**. Tính xong có thể tính lại luôn dòng hóa đơn liên quan.

Process cron `asn_unnotified` chạy 2 giờ sáng giờ New York để bắt các dòng thiếu ASN.

## 810 — Hóa đơn

Prefix file: `INV`.

Sau khi ghi hóa đơn, `InvoiceIngestor` so các dòng của đúng số hóa đơn đó với purchase order và ASN. Hóa đơn cũ trên cùng một dòng purchase order không bị ghi đè.

## Exception evaluator — đối chiếu item và contract với MSS

Process này chạy theo lịch, không đọc file. Nó chỉ chạy khi org bật MSS item validation.

Hai giai đoạn:

1. **Item:** các dòng chưa được đánh giá item được gửi sang MSS (`LookupItems`). Kết quả ghi vào `po_item_details`. Nếu bật contract validation, contract được lấy trong cùng lượt gọi.
2. **Contract:** các dòng đã bỏ qua item nhưng còn cần contract được gửi `LookupBestContract`, ghi `po_contract_details`.

Kết quả là exception item/contract, ví dụ nhiều item khớp (key 10), lệch UOM với item master (key 11), lệch giá với item hoặc contract (key 12). Sau đó service gộp exception và severity lên purchase order.

## Threshold — đơn quá hạn chưa được acknowledge

Process này quét setting thời hạn. Purchase order quá hạn mà chưa có acknowledgement được đánh dấu unacknowledged (key 1). Sau đó nó dựng lại hai chỉ số: tỷ lệ fill acknowledgement và tỷ lệ exception acknowledgement, rồi ghi history.

## Kafka — hàng đợi sự kiện giữa các process

Kafka không lưu purchase order. PostgreSQL mới là nơi giữ dữ liệu. Kafka chỉ chuyển tin "file này bắt đầu", "file này xong" hoặc "file này lỗi" giữa pm-transfers và Go worker.

Mỗi tổ chức một topic: `pm.org.{org_code}.events`. Message là JSON. Key là id của event, balancer hash theo key nên các event của cùng một process đi cùng partition và giữ thứ tự. Writer chờ ack từ mọi replica (`RequireAll`), nén Snappy, thử ghi lại tối đa 3 lần.

Vòng đời event:

1. pm-transfers publish `ProcessStarted` sau khi upload thành công.
2. `worker-consumer-{org_code}` chỉ xử lý `ProcessStarted`. Các event khác bị bỏ qua.
3. Processor xong thì publish `ProcessCompleted` (kèm số dòng và thời gian) hoặc `ProcessFailed` (kèm lỗi).
4. pm-transfers đọc hai event đó và cập nhật trạng thái file.

Consumer commit tay sau khi xử lý thành công. Message lỗi không commit và không có dead-letter queue riêng. `ProcessQueued` và `ProcessInProgress` có trong struct nhưng code không publish.

Orchestrator (`worker-producer`) theo dõi process nào đang chạy để tránh chạy chồng (ví dụ 855 và threshold). Với file 850/855/856/810, cấu hình hiện tại để Ruby phát `ProcessStarted` thẳng, nên bước orchestrator này không chặn các file đó.

## Redis — dữ liệu ngắn hạn, không phải database chính

Redis mất dữ liệu cũng không mất purchase order. Nó giữ những thứ cần nhanh và có hạn.

- **Session đăng nhập.** Cookie `max_session` trỏ tới key `session:{token}` trong Redis, sống 60 phút. Trong đó có user, org, role. API đọc session này trước khi vào dữ liệu của org. Logout thì xóa key.
- **Job nền (asynq).** Asynq dùng Redis làm hàng đợi. Có các queue `critical`, `default`, `low` (mail, notification) và `build` (việc nặng như quét ASN thiếu). `worker-job` đặt lịch, worker lấy task ra chạy. Task `asn_unnotified` được thiết kế chạy mỗi org một lần mỗi ngày, mặc định 2 giờ sáng giờ New York. Lịch trong file config có thể khác giữa môi trường.
- **Notification realtime.** Khi có việc cho buyer, service `XADD` vào stream `notifications:stream:org:{org_id}`. Stream bền hơn pub/sub và được cắt bớt để khỏi phình bộ nhớ.
- **Chống chạy cron trùng.** Nếu nhiều bản worker cùng lịch, `SET NX` trên Redis chỉ cho một bản giữ lock. Hết TTL thì key tự mất.
- **SSO và ngữ cảnh ngắn.** JWT đăng nhập từ MSS được ghi `jti` vào `mss_sso:jti:{id}` đúng thời gian sống của token, để đối chiếu lần phát hành. MSS vẫn tự kiểm tra chữ ký JWT. Ngữ cảnh mở màn hình EDI lưu ở `edi_ar:ctx:{token}`, mặc định 15 phút, đọc một lần rồi xóa.

## OpenSearch sync — cho màn hình search

Process chạy theo lịch. Nó rút hàng `opensearch_sync_queue` và cập nhật index: document mới hoặc document bị xóa. API buyer đọc OpenSearch để lọc purchase order, exception và thống kê hàng đợi. Nếu `OPENSEARCH_ENABLED=false` thì process bỏ qua.

## Buyer làm gì sau khi exception đã có

- Tìm purchase order và exception trên OpenSearch.
- Gán việc cho người khác trong cùng corporation (`ReassignmentService`).
- Sửa giá dòng purchase order. Service ghi giá mới, ghi history, rồi tính lại exception của dòng đó.
- Đăng nhập và dữ liệu item, contract lấy từ hệ thống bệnh viện (MSS), không phải user tự gõ trong MAX.

## Câu nên nói trong interview

MAX nhận purchase order của bệnh viện và acknowledgement, ASN, hóa đơn của nhà cung cấp. Go worker xử lý từng loại file, so dòng, ghi exception vào PostgreSQL, rồi đồng bộ OpenSearch để buyer tìm và xử lý trên một màn hình.

Phần tôi nắm rõ là luồng 850/855, cách exception được tính và gộp lên purchase order, và việc giữ search cùng API chạy sau khi release: job lỗi, index search, lỗi API, checklist trước deploy.
