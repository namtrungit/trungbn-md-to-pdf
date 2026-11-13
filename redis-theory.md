# Redis — Lý thuyết

## 1. Redis là gì

Redis là kho dữ liệu lưu trên RAM, truy cập rất nhanh. Dữ liệu được lưu theo cặp **key → value**, và value có nhiều kiểu khác nhau.

Redis thường được dùng cho:
- Cache
- Session
- Khóa phân tán (distributed lock)
- Counter, rate limit

So với PostgreSQL:

| Tiêu chí | PostgreSQL | Redis |
|---|---|---|
| Lưu trữ | Đĩa, bền vững | RAM (có thể lưu xuống đĩa tùy cấu hình) |
| Tốc độ | Nhanh | Rất nhanh |
| Truy vấn | SQL, quan hệ, phức tạp | Theo key, đơn giản |
| Vai trò | Nguồn dữ liệu chính | Thường là lớp phụ trợ |

## 2. Các kiểu dữ liệu

| Kiểu | Mô tả | Ví dụ dùng | Lệnh cơ bản |
|---|---|---|---|
| String | Một chuỗi (có thể là JSON) | Cache object, counter | `SET`, `GET`, `INCR` |
| Hash | Map các field trong một key | Object có nhiều thuộc tính | `HSET`, `HGET`, `HGETALL` |
| List | Danh sách có thứ tự | Queue đơn giản | `LPUSH`, `RPOP` |
| Set | Tập hợp không trùng lặp | Tag, danh sách duy nhất | `SADD`, `SMEMBERS` |
| Sorted Set | Set có điểm số để sắp xếp | Bảng xếp hạng | `ZADD`, `ZRANGE` |

Trong cache thông thường, **String** là kiểu dùng nhiều nhất, vì thường lưu một chuỗi JSON.

## 3. TTL (Time To Live)

TTL là thời gian sống của một key. Khi hết thời gian, Redis tự xóa key đó.

- `SET key value EX 300`: lưu key với TTL 300 giây.
- `TTL key`: xem key còn sống bao lâu. Trả về `-1` nếu không có TTL, `-2` nếu key không tồn tại.
- `EXPIRE key seconds`: đặt TTL cho key đã tồn tại.

TTL là cơ chế chính để dữ liệu cache không bị cũ mãi.

## 4. Cache-aside pattern

Đây là pattern cache phổ biến nhất. Ứng dụng tự điều khiển việc đọc và ghi cache.

```
1. Đọc cache
     - Có dữ liệu (cache hit)  → trả về ngay
     - Không có (cache miss)   → sang bước 2
2. Đọc database
3. Ghi kết quả vào cache với TTL
4. Trả về kết quả
```

Lưu ý quan trọng:
- Redis không tự đọc DB. Ứng dụng quyết định khi nào đọc cache, khi nào đọc DB.
- Khi dữ liệu thay đổi trong DB, cần **xóa hoặc cập nhật** cache. Nếu không, người dùng sẽ thấy dữ liệu cũ cho đến khi TTL hết hạn.

## 5. Khóa phân tán (Distributed lock)

Khi nhiều server cùng chạy, một số thao tác không được chạy đồng thời. Khóa phân tán dùng Redis để đảm bảo chỉ một tiến trình giữ lock tại một thời điểm.

Cách làm: `SET key value NX EX seconds`

- **NX**: chỉ set nếu key **chưa tồn tại**. Nếu đã có, lệnh thất bại, nghĩa là lock đang bị giữ.
- **EX**: đặt TTL cho lock. Nếu tiến trình giữ lock bị crash, lock sẽ tự hết hạn.

Lưu ý:
- Lock **phải có TTL**. Nếu không, lock có thể bị giữ vĩnh viễn khi tiến trình chết.
- TTL phải đủ dài để công việc hoàn thành, nhưng không nên quá dài.
- Khi nhả lock, chỉ nên xóa nếu lock vẫn thuộc về mình (thường dùng một giá trị ngẫu nhiên làm token để kiểm tra).

## 6. Thư viện go-redis

Thư viện phổ biến để dùng Redis trong Go là `github.com/redis/go-redis/v9`.

Các điểm cần biết:
- Tạo client **một lần** khi khởi động ứng dụng, rồi tái sử dụng, giống kết nối DB.
- Mọi lệnh nhận `ctx context.Context` làm tham số đầu tiên, giống pgx.
- Lệnh `Get` trả về lỗi `redis.Nil` khi key không tồn tại. Đây **không phải** lỗi hệ thống. Cần kiểm tra bằng `errors.Is(err, redis.Nil)` để phân biệt:
  - Cache miss: `redis.Nil`, cần đọc DB.
  - Redis lỗi: lỗi khác, cần xử lý theo chính sách của hệ thống.
- Giá trị TTL truyền vào dưới dạng `time.Duration`, ví dụ `5 * time.Minute`.

## 7. Lưu ý khi dùng cache

- Cache là **bản sao** của dữ liệu, không phải nguồn sự thật. Nguồn sự thật vẫn là database.
- Chọn TTL hợp lý: quá ngắn thì cache ít hiệu quả, quá dài thì dữ liệu dễ cũ.
- Nếu Redis không khả dụng, ứng dụng nên vẫn đọc được từ DB, thay vì trả lỗi cho người dùng.
- Tránh lưu dữ liệu quá lớn vào một key, vì sẽ làm chậm cả hệ thống.

## 8. Các câu hỏi thường gặp

- **Redis có bền vững không?** Có thể cấu hình lưu xuống đĩa (RDB snapshot hoặc AOF), nhưng mặc định vẫn ưu tiên tốc độ. Không nên coi Redis là nơi lưu dữ liệu duy nhất.
- **Vì sao không dùng Redis làm DB chính?** Redis không có truy vấn quan hệ, không có ràng buộc khóa ngoại, và dung lượng bị giới hạn bởi RAM.
- **Cache-aside khác write-through thế nào?** Cache-aside: ứng dụng ghi DB, rồi xóa hoặc để cache tự nạp lại khi đọc. Write-through: ghi đồng thời vào cache và DB trong cùng một thao tác.
