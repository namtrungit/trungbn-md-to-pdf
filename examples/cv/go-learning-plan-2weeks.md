# Go Learning Plan — 2 Tuần (Fullstack Interview)

## Thông tin
- **Background:** Frontend Developer, biết Ruby cơ bản
- **Mục tiêu:** Đủ tự tin nói về Go trong phỏng vấn Fullstack
- **Thời gian:** 2–3 giờ/ngày
- **Tài nguyên chính:** [gobyexample.com](https://gobyexample.com) + code thật trong `pm-services`

---

## Tuần 1 — Nền tảng Go

### Ngày 1 — Setup + Syntax cơ bản
**Học:**
- Cài Go, setup VS Code / Zed với extension Go
- Variables, types, functions, `if`, `for` (Go không có `while`)
- Error handling: `error` interface, `if err != nil`

**So sánh với Ruby:**
```go
// Ruby: def greet(name); "Hello #{name}"; end
// Go:
func greet(name string) string {
    return "Hello " + name
}

// Ruby: raise "something went wrong"
// Go: return errors.New("something went wrong")
```

**Đọc code pm-services:** `internal/shared/errors/` — xem cách team define custom error

---

### Ngày 2 — Struct + Interface + Pointer
**Học:**
- **Pointer cơ bản:** `&` (lấy địa chỉ) và `*` (lấy giá trị tại địa chỉ)
- Struct (thay class trong Ruby)
- Method trên struct
- Pointer receiver vs value receiver
  - Pointer receiver `(*Type)` — khi muốn modify struct
  - Value receiver `(Type)` — khi chỉ đọc
- Interface — Go dùng implicit implementation (không cần `implements`)

```go
type PurchaseOrder struct {
    ID     string
    Status string
}

// Method trên struct
func (po *PurchaseOrder) IsAcknowledged() bool {
    return po.Status == "acknowledged"
}
```

**Đọc code pm-services:** `internal/modules/po/domain/purchase_order.go` — xem struct PO thật

---

### Ngày 3 — Slice, Map, Package
**Học:**
- Slice (như Array trong Ruby nhưng khác về memory)
- Map (như Hash trong Ruby)
- Package và import
- `go.mod` — như Gemfile

**Lưu ý quan trọng:**
```go
// Slice tạo reference, không copy
a := []int{1, 2, 3}
b := a        // b trỏ cùng chỗ với a
b[0] = 99     // a[0] cũng thành 99!

// Muốn copy thì dùng:
b := make([]int, len(a))
copy(b, a)
```

**Đọc code pm-services:** `internal/modules/po/domain/po_line.go`

---

### Ngày 4 — Goroutine + Channel
**Học:**
- Goroutine là gì (lightweight thread của Go)
- Channel — cách goroutine giao tiếp
- `sync.WaitGroup` — đợi nhiều goroutine xong

**Đây là điểm Go khác nhất so với Ruby:**
```go
// Chạy đồng thời 3 task
var wg sync.WaitGroup
for _, id := range poIDs {
    wg.Add(1)
    go func(id string) {
        defer wg.Done()
        processPO(id)
    }(id)
}
wg.Wait() // đợi tất cả xong
```

**Đọc code pm-services:** `internal/shared/worker/` — xem worker pool thật

---

### Ngày 5 — Context + Defer + Error Wrapping
**Học:**
- `context.Context` — truyền vào mọi hàm, dùng để cancel/timeout
- `defer` — chạy khi function kết thúc (như `ensure` trong Ruby)
- `fmt.Errorf("%w", err)` — wrap error để giữ stack

```go
func getOrder(ctx context.Context, id string) (*PO, error) {
    // context có timeout → tự cancel sau 5 giây
    ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
    defer cancel() // luôn gọi cancel khi xong

    po, err := repo.FindByID(ctx, id)
    if err != nil {
        return nil, fmt.Errorf("getOrder %s: %w", id, err)
    }
    return po, nil
}
```

**Đọc code pm-services:** bất kỳ file nào trong `application/` — mọi hàm đều nhận `ctx`

---

### Ngày 6 — Build REST API với Gin
**Học:**
- Gin: router, group, middleware
- Bind JSON từ request body
- Trả về JSON response
- Gin middleware: logging, auth

```go
r := gin.New()
r.Use(gin.Logger())

api := r.Group("/api/v1")
api.Use(authMiddleware())
{
    api.GET("/orders", handler.ListOrders)
    api.POST("/orders", handler.CreateOrder)
}
```

**Đọc code pm-services:** `pkg/api/` — xem router thật + handlers

---

### Ngày 7 — Connect PostgreSQL với pgx
**Học:**
- Kết nối PostgreSQL bằng `pgx`
- Query cơ bản: SELECT, INSERT, UPDATE
- Transaction
- Prepared statement để tránh SQL injection

```go
// Query với pgx
rows, err := pool.Query(ctx,
    "SELECT id, status FROM purchase_orders WHERE org_id = $1",
    orgID,
)
```

**Đọc code pm-services:** `internal/shared/database/` + `internal/modules/po/infrastructure/`

---

## Tuần 2 — Công nghệ nâng cao

### Ngày 8 — Clean Architecture trong Go
**Học:**
- Hiểu 4 layer: Domain → Application → Infrastructure → Interface
- Tại sao tách layer (testability, maintainability)
- Repository pattern: interface ở domain, implement ở infrastructure

**Đọc toàn bộ flow một tính năng trong pm-services:**
```
po/domain/interfaces.go          → định nghĩa interface
po/application/po_service.go     → business logic, gọi interface
po/infrastructure/repository.go  → implement interface, query DB
pkg/api/handlers/po.go           → HTTP handler, gọi application
```

---

### Ngày 9 — Redis
**Học:**
- Connect Redis với `go-redis`
- GET/SET với TTL
- Cache-aside pattern
- Distributed lock với `SET NX EX`

```go
// Cache-aside pattern
func (s *Service) GetVendor(ctx context.Context, id string) (*Vendor, error) {
    // 1. Check cache
    cached, err := s.redis.Get(ctx, "vendor:"+id).Result()
    if err == nil {
        // cache hit
        var vendor Vendor
        json.Unmarshal([]byte(cached), &vendor)
        return &vendor, nil
    }

    // 2. Query DB
    vendor, err := s.repo.FindByID(ctx, id)
    if err != nil {
        return nil, err
    }

    // 3. Write cache, TTL 5 phút
    data, _ := json.Marshal(vendor)
    s.redis.Set(ctx, "vendor:"+id, data, 5*time.Minute)
    return vendor, nil
}
```

**Đọc code pm-services:** tìm `redis` usage trong codebase

---

### Ngày 10 — Kafka
**Học:**
- Concept: topic, partition, consumer group, offset
- Producer: publish message
- Consumer: đọc message, commit offset
- Tại sao dùng Kafka thay vì gọi trực tiếp

```go
// Producer
w := kafka.NewWriter(kafka.WriterConfig{
    Brokers: []string{"localhost:9092"},
    Topic:   "edi-850",
})
w.WriteMessages(ctx, kafka.Message{
    Value: []byte(`{"po_id": "123", "type": "850"}`),
})

// Consumer
r := kafka.NewReader(kafka.ReaderConfig{
    Brokers: []string{"localhost:9092"},
    Topic:   "edi-850",
    GroupID: "worker-consumer",
})
msg, _ := r.FetchMessage(ctx)
// xử lý...
r.CommitMessages(ctx, msg)
```

**Đọc code pm-services:** `internal/shared/kafka/event_consumer.go` + `event_publisher.go`

---

### Ngày 11 — Background Job với Asynq
**Học:**
- Asynq là gì (Redis-backed job queue, như Sidekiq trong Ruby)
- Tạo task, enqueue task
- Worker xử lý task
- Retry tự động khi fail

```go
// Enqueue task gửi email
task := asynq.NewTask("email:send", payload)
client.Enqueue(task, asynq.MaxRetry(3), asynq.Timeout(30*time.Second))

// Worker handler
func HandleEmailTask(ctx context.Context, t *asynq.Task) error {
    // xử lý gửi email
    return nil
}
```

**Đọc code pm-services:** `internal/shared/asyncq/` — tasks, handlers, schedule

---

### Ngày 12 — Testing trong Go
**Học:**
- Unit test với `testing` package
- `testify` assert
- Mock với interface
- Table-driven test (pattern phổ biến trong Go)

```go
func TestGetOrder_NotFound(t *testing.T) {
    tests := []struct {
        name    string
        input   string
        wantErr bool
    }{
        {"valid id", "po-123", false},
        {"empty id", "", true},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            _, err := service.GetOrder(ctx, tt.input)
            assert.Equal(t, tt.wantErr, err != nil)
        })
    }
}
```

**Đọc code pm-services:** `internal/modules/po/application/po_service_list_test.go`

---

### Ngày 13 — OpenSearch + Structured Logging
**Học:**
- OpenSearch cơ bản: index, search, filter
- Tại sao cần OpenSearch thay vì PostgreSQL LIKE
- Zap logger: structured log, log level, request ID

```go
// Zap logger
logger.Info("PO processed",
    zap.String("po_id", po.ID),
    zap.String("org_id", orgID),
    zap.Duration("duration", time.Since(start)),
)
```

**Đọc code pm-services:** `internal/shared/opensearch/` + `internal/shared/logger/`

---

### Ngày 14 — Ôn tập + Interview Questions

**Câu hỏi hay gặp và câu trả lời ngắn:**

| Câu hỏi | Trả lời chốt |
|---|---|
| Goroutine vs Thread? | Goroutine nhẹ hơn (2KB vs 1MB), do Go runtime quản lý, có thể chạy hàng triệu cái cùng lúc |
| Interface trong Go khác Java? | Go dùng implicit — struct không cần khai báo `implements`, chỉ cần có đủ method |
| Khi nào dùng Channel, khi nào dùng Mutex? | Channel cho giao tiếp giữa goroutine, Mutex cho protect shared data |
| Error handling trong Go? | Không có exception, error là return value thứ 2, check `if err != nil` mọi chỗ |
| Context dùng để làm gì? | Cancel/timeout request, truyền request-scoped value (user_id, org_id) qua các layer |
| Kafka vs Redis Pub/Sub? | Kafka persist message (replay được, không mất khi consumer down), Redis Pub/Sub thì không |
| Tại sao dùng Clean Architecture? | Tách business logic khỏi framework/DB — dễ test, dễ thay đổi infrastructure |
| Pointer receiver vs value receiver? | Pointer khi cần modify struct hoặc struct lớn, value khi read-only và struct nhỏ |

---

## Mini Project để thực hành (tuần 2)

Build một **PO Management API** đơn giản:

```
POST   /api/v1/orders          - Tạo PO
GET    /api/v1/orders          - List PO (có pagination)
GET    /api/v1/orders/:id      - Get PO detail
PUT    /api/v1/orders/:id/ack  - Vendor ACK PO line

Stack: Gin + PostgreSQL (pgx) + Redis (cache vendor list) + JWT auth
```

Tham khảo structure từ `pm-services` — không cần viết từ đầu, học cách repo thật làm rồi làm theo.

---

## Thứ tự ưu tiên nếu không đủ thời gian

1. **Bắt buộc (tuần 1):** Syntax, Struct/Interface, Gin, PostgreSQL
2. **Quan trọng (tuần 2 đầu):** Clean Architecture, Redis, Kafka
3. **Bonus:** Asynq, OpenSearch, Testing

Biết **ít mà giải thích được rõ ràng** tốt hơn biết nhiều mà mơ hồ.
