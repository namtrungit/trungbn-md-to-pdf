# Kafka — Lý thuyết

## 1. Kafka là gì

Kafka là hệ thống message streaming. Producer ghi message vào Kafka, consumer đọc message từ Kafka. Hai bên không gọi trực tiếp nhau, nên không cần biết nhau còn sống hay không.

Kafka thường dùng cho:
- Xử lý bất đồng bộ: việc nặng hoặc chậm được đẩy vào hàng đợi, xử lý sau.
- Tích hợp giữa các service.
- Lưu log sự kiện để đọc lại khi cần.

## 2. Tại sao dùng Kafka thay vì gọi trực tiếp

```
Gọi trực tiếp (A chờ B):

  Service A ──HTTP──> Service B
     │                   │
     └──── chờ ──────────┘   (B chậm/chết → A bị ảnh hưởng)


Qua Kafka (A không chờ B):

  Service A ──ghi──> [ Kafka ] ──đọc──> Service B
                       │
                  message được giữ lại
                  (B chết vẫn còn, đọc tiếp sau)
```

Khi A gọi trực tiếp B:
- Nếu B chậm hoặc chết, A bị ảnh hưởng ngay (timeout, lỗi).
- A phải biết địa chỉ và API của B.

Khi A ghi message vào Kafka:
- A ghi xong là xong, không chờ B xử lý.
- Nếu B chết, message vẫn nằm trong Kafka. Khi B sống lại, đọc tiếp từ chỗ dừng.
- Có thể thêm consumer mới mà không sửa producer.

Đổi lại, hệ thống phức tạp hơn và xử lý thường là **bất đồng bộ**: producer không biết kết quả ngay.

## 3. Các khái niệm cốt lõi

| Khái niệm | Ý nghĩa |
|---|---|
| **Broker** | Một server Kafka. Cụm nhiều broker gọi là cluster. |
| **Topic** | Tên một luồng message, ví dụ `edi-850`. Giống như một "kênh". |
| **Partition** | Mỗi topic chia thành nhiều partition. Mỗi partition là một dãy message có thứ tự. |
| **Offset** | Số thứ tự của message trong một partition, tăng dần từ 0. |
| **Producer** | Bên ghi message vào topic. |
| **Consumer** | Bên đọc message từ topic. |
| **Consumer group** | Nhóm consumer cùng làm một việc. Mỗi partition chỉ được một consumer trong nhóm đọc tại một thời điểm. |

Điểm cần nhớ:
- **Thứ tự chỉ đảm bảo trong một partition.** Message khác partition có thể đến không theo thứ tự.
- **Consumer group** giúp chia việc: nhiều instance cùng group sẽ chia nhau các partition.
- **Message không bị xóa khi đã đọc.** Kafka giữ message trong một khoảng thời gian (retention). Consumer chỉ lưu vị trí đã đọc, gọi là offset.

### Topic và partition

```
Topic: edi-850

  Partition 0:  [0] [1] [2] [3] [4] ...   ← offset tăng dần
  Partition 1:  [0] [1] [2] ...
  Partition 2:  [0] [1] [2] [3] ...

  Thứ tự chỉ đảm bảo TRONG một partition.
```

### Consumer group

```
Topic edi-850 (3 partition)

  P0 ──────> Consumer A ┐
  P1 ──────> Consumer B ├── cùng group "worker-consumer"
  P2 ──────> Consumer C ┘

  Mỗi partition chỉ có MỘT consumer trong group đọc.
  Thêm consumer vào group → Kafka chia lại partition.
```

## 4. Offset và commit

Consumer đọc message, xử lý, rồi **commit offset** để báo "đã xử lý đến đây".

```
Partition 0:  [0] [1] [2] [3] [4] [5]
                          ▲
                          │ offset đã commit = 3
                          │ (đã xử lý đến message 2)

Consumer chết khi đang xử lý message 3
  → khởi động lại → đọc từ offset 3 → message 3 được xử lý lại
```

- Nếu consumer chết **trước** khi commit, lần khởi động lại sẽ đọc lại message đó. Vì vậy xử lý message nên **idempotent** (chạy lại nhiều lần vẫn cho kết quả đúng).
- Nếu commit **trước** khi xử lý xong, và consumer chết giữa chừng, message có thể bị bỏ sót.

Luồng xử lý đúng (commit sau cùng):

```
  Fetch message
       │
       ▼
  Xử lý (idempotent)
       │
   ┌───┴────┐
  OK       Lỗi
   │        │
Commit    Không commit
offset    (sẽ đọc lại)
```

## 5. Producer và consumer trong Go

Thư viện phổ biến: `github.com/segmentio/kafka-go`.

Các bước chung:

**Producer:**
1. Tạo writer với địa chỉ broker và tên topic.
2. Ghi message (dạng `[]byte`, thường là JSON).
3. Kiểm tra lỗi và đóng writer khi xong.

**Consumer:**
1. Tạo reader với broker, topic và `GroupID`.
2. Lấy message (fetch).
3. Xử lý message.
4. Commit message đó.

Lưu ý:
- Đoạn code trong plan là bản phác thảo để hiểu luồng, nên tên hàm và cấu hình có thể khác bản thư viện thực tế. Khi làm, kiểm tra lại bằng `go doc`.
- Kafka cần broker đang chạy ở `localhost:9092`. Nếu chưa có, cần cài Kafka (thường dùng Docker) trước khi làm bài thực hành.

## 6. Kafka và Redis Pub/Sub

- **Kafka** lưu message lại, đọc lại được, không mất khi consumer đang offline.
- **Redis Pub/Sub** chỉ gửi message cho người đang lắng nghe. Nếu consumer không online lúc message đến, message mất.

Vì vậy Kafka phù hợp cho các sự kiện cần đảm bảo xử lý (đơn hàng, EDI), còn Pub/Sub phù hợp cho thông báo tạm thời.

## 7. Câu hỏi tự kiểm tra

- Vì sao producer không cần chờ consumer xử lý xong?
  → Kafka chỉ cần ghi message và xác nhận với producer. Xử lý diễn ra sau, ở consumer.
- Thứ tự message được đảm bảo ở phạm vi nào?
  → Trong một partition.
- Nếu consumer xử lý xong nhưng chết trước khi commit, điều gì xảy ra?
  → Message được đọc lại và xử lý trùng.
- Tại sao nên viết consumer theo hướng idempotent?
  → Vì có thể xử lý trùng. Chạy lại phải cho kết quả giống, ví dụ kiểm tra `po_id` đã xử lý chưa trước khi ghi.
