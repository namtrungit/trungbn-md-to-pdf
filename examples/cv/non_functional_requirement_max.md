# MAX — Tóm tắt yêu cầu phi chức năng

Nguồn: `MAX_Non_Functional_Requirements_1_3.pdf`  
Phân loại: Confidential  
Phiên bản: 1.3 (cập nhật lần cuối: Trang Nguyen-Thao, hiệu lực 12/08/2026)

## Mục đích và phạm vi

Tài liệu mô tả yêu cầu phi chức năng của ứng dụng MAX theo bốn nhóm: bảo mật, khả năng mở rộng, hiệu năng và khả năng đáp ứng giao diện. Không còn vấn đề mở (mục 6: N/A).

## 1. Bảo mật

Hệ thống và dữ liệu phải được bảo vệ trước mối đe dọa cố ý và vô tình.

- **Xác thực và phân quyền:** Mọi truy cập phải được xác thực. Dùng RBAC để giới hạn dữ liệu và chức năng theo vai trò. Hỗ trợ tích hợp nhà cung cấp danh tính chuẩn qua OAuth 2.0 hoặc OpenID Connect.
- **Mã hóa:** Dữ liệu truyền trên mạng ngoài dùng TLS 1.2 trở lên. Dữ liệu nhạy cảm lưu trong cơ sở dữ liệu (mật khẩu, thông tin cá nhân) mã hóa lúc nghỉ bằng AES-256.
- **Mật khẩu:** Tối thiểu 12 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
- **Quét lỗ hổng:** Mã nguồn được quét định kỳ; không để lỗ hổng mức Medium trở lên chưa xử lý. Thời hạn khắc phục:

| Mức | Thời hạn |
| --- | --- |
| Critical | 10–30 ngày, tùy đánh giá rủi ro và độ phức tạp |
| High | 30–90 ngày, tùy đánh giá rủi ro và độ phức tạp |
| Medium | 90–180 ngày, tùy đánh giá rủi ro và độ phức tạp |
| Low | 180 ngày |
| Information | Không bắt buộc |

## 2. Khả năng mở rộng

Hệ thống phải giữ chuẩn hiệu năng khi tải và dữ liệu tăng.

- **Người dùng đồng thời:** 50–200 người, vẫn đạt chuẩn hiệu năng.
- **Tăng trưởng dữ liệu trong 3 năm:**

| Mốc | Giao dịch/ngày | Tổng ước tính |
| --- | --- | --- |
| Ra mắt | 3.500 | ~315.000 (sau 3 tháng) |
| Sau 1 năm | 10.000 | ~3,5 triệu |
| Sau 3 năm | 28.000 | ~20 triệu |

## 3. Hiệu năng

- **Trải nghiệm người dùng:** Trang chính (trang chủ, dashboard) có Time to Interactive dưới 3 giây. Thao tác cốt lõi (tải trang, gửi form) hoàn thành trong 2–3 giây. Thao tác lâu hơn phải có chỉ báo đang tải.
- **API:** Mỗi giao dịch từ bên thứ ba được xác nhận trong 300 ms, tính từ lúc nhận yêu cầu đến lúc trả phản hồi. Hệ thống nhận tối đa 100 file cùng lúc qua API mà không giảm thời gian phản hồi.
- **Xử lý file** (đơn vị: dòng/giây). Mỗi loại sau phải xử lý xong 250 dòng trong 30 giây:
  - Acknowledgement
  - Purchase Order (PO)
  - Shipping Notification (ASN)
  - Invoice (INV)

  Thời gian đo từ lúc nhận file qua API đến khi xử lý xong và lưu vào cơ sở dữ liệu MAX. Tốc độ không phụ thuộc số file, số dòng mỗi file, hay số tổ chức. Tiến trình tải file chạy độc lập, hiệu năng giữ nguyên khi chạy song song với luồng khác. Không mất hoặc hỏng dữ liệu sau giải mã và xếp hàng. Cơ chế thử lại không được xử lý trùng. Chỉ số này áp dụng cho cả luồng ánh xạ Item và Contract.

## 4. Khả năng đáp ứng giao diện

- **Bố cục thích ứng:** Giao diện dùng được, không thanh cuộn ngang, không chồng hoặc khó đọc nội dung ở các cấu hình:
  - Độ phân giải: 1920×1080 và 1366×768
  - Tỷ lệ hiển thị: 100% và 125%
  - Zoom trình duyệt: 80%–110%
- **Trình duyệt:** Giao diện hoạt động đầy đủ trên trình duyệt hiện đại, cụ thể Chrome và Edge.
