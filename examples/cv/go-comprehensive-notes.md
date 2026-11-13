# Go Comprehensive Notes — 5 Days Learning

## Ngày 1 — Basics (Variables, Functions, If/For, Error)

### Variables
```go
name := "Trung"          // Short declaration (trong function)
var age int = 28         // Full declaration (ngoài function được)
var score int            // Zero value = 0
```

**Quy tắc:** `:=` dùng trong function, `var` ngoài function được

### Functions
```go
func greet(name string) string {
    return "Hello " + name
}

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("divide by zero")
    }
    return a / b, nil
}
```

**Key:** Multiple return values, thường là `(result, error)`

### If/For
```go
// If không cần ()
if score >= 90 {
    fmt.Println("Excellent")
}

// Go không có while, dùng for thay
for i := 0; i < 5; i++ { }       // Loop thường
for count < 10 { count++ }        // Như while
for index, value := range slice { } // Duyệt collection
```

### Error Handling
```go
result, err := doTask()
if err != nil {
    fmt.Println("Error:", err)
    return
}
```

**Key:** Luôn check `if err != nil` — không có exception

---

## Ngày 2 — Pointer, Struct, Interface, Method

### Pointer
```go
score := 50
ptr := &score        // & = lấy địa chỉ
*ptr = 100          // * = lấy giá trị tại địa chỉ
fmt.Println(score)  // 100 — gốc thay đổi
```

**Quy tắc:**
- `&variable` = lấy địa chỉ (pointer)
- `*pointer` = dereference (lấy giá trị)
- `*Type` = kiểu pointer

### Struct
```go
type Product struct {
    Name  string
    Price float64
    Stock int
}

p := Product{
    Name: "Laptop",
    Price: 999.9,
    Stock: 10,
}

p.Name = "Desktop"  // Truy cập field
```

### Method
```go
// Value receiver — chỉ đọc
func (p Product) IsInStock() bool {
    return p.Stock > 0
}

// Pointer receiver — sửa được gốc
func (p *Product) ReduceStock(qty int) {
    p.Stock -= qty
}
```

**Key:** Pointer receiver khi cần sửa gốc, value receiver khi chỉ đọc

### Interface
```go
type Storer interface {
    IsInStock() bool
    ReduceStock(qty int)
}

// Product tự động implement Storer (implicit)
// Không cần viết "implements Storer"
```

**Key:** Go implicit (không khai báo), Java/Rust explicit

---

## Ngày 3 — Slice, Map, Package

### Slice (Dynamic Array)
```go
numbers := []int{1, 2, 3, 4, 5}

numbers = append(numbers, 6)      // Thêm
slice := numbers[1:3]             // Slice: [2, 3]
fmt.Println(len(numbers))         // 6

// ⚠️ Slice là REFERENCE, không copy!
a := []int{1, 2, 3}
b := a
b[0] = 99
fmt.Println(a[0])  // 99 — a cũng thay đổi
```

### Map (Key-Value)
```go
scores := map[string]int{
    "Trung": 90,
    "Nam": 85,
}

scores["Minh"] = 88       // Thêm
delete(scores, "Nam")     // Xóa

value, ok := scores["Trung"]  // Kiểm tra key tồn tại
if ok {
    fmt.Println(value)
}

for key, value := range scores {  // Duyệt
    fmt.Println(key, value)
}
```

### Package
```go
// utils/math.go
package utils

func Add(a, b int) int {  // Viết hoa = public
    return a + b
}

func subtract(a, b int) int {  // Viết thường = private
    return a - b
}
```

---

## Ngày 4 — Goroutine, Channel, WaitGroup

### Goroutine (Lightweight Thread)
```go
go doTask()  // Chạy song parallel
```

**Key:** Goroutine = 2KB (vs Thread = 1MB), Go runtime quản lý

### Channel (Giao Tiếp)
```go
ch := make(chan int)        // Buffer = 0 (unbuffered)
ch := make(chan int, 5)     // Buffer = 5

ch <- 42                    // Gửi vào channel
value := <-ch              // Nhận từ channel
```

**Buffer:**
- `0`: BLOCK nếu không ai nhận
- `1`: OK gửi 1 lần, sau BLOCK
- `N`: OK gửi N lần, sau BLOCK

### Read-Only / Write-Only
```go
func consumer(ch <-chan int) {      // Chỉ nhận
    value := <-ch  // ✅
    ch <- 99       // ❌ Error
}

func producer(ch chan<- int) {      // Chỉ gửi
    ch <- 42       // ✅
    value := <-ch  // ❌ Error
}
```

### WaitGroup (Đợi Worker)
```go
var wg sync.WaitGroup

for i := 1; i <= 3; i++ {
    wg.Add(1)                   // Thêm 1 worker
    go func(id int) {
        defer wg.Done()         // Báo xong
        doTask(id)
    }(i)
}

wg.Wait()  // Chặn, chờ tất cả xong
```

**Key:** WaitGroup = barrier, chặn main cho đến khi worker xong

### Use Case: Promise.all (JS) = Goroutine + Channel (Go)
```go
results := make(chan string, 3)

go func() { results <- fetch("api1") }()
go func() { results <- fetch("api2") }()
go func() { results <- fetch("api3") }()

for i := 0; i < 3; i++ {
    fmt.Println(<-results)
}
```

---

## Ngày 5 — Context, Defer, Error Wrapping

### Defer (Cleanup)
```go
func test() {
    fmt.Println("1")
    defer fmt.Println("3")  // Chạy ở cuối
    fmt.Println("2")
}

// Output: 1 2 3
```

**Key:** LIFO (Last In First Out) — defer cuối cùng chạy trước

### Context WithTimeout (Deadline)
```go
ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
defer cancel()  // Luôn gọi cancel

if ctx.Err() != nil {
    return "", ctx.Err()  // "context deadline exceeded"
}
```

**Key:** Deadline = hiện tại + 3s, timeout tự động nếu quá

### Context WithCancel
```go
ctx, cancel := context.WithCancel(context.Background())
defer cancel()

go func() {
    time.Sleep(5 * time.Second)
    cancel()  // Huỷ context
}()

select {
case <-ctx.Done():
    fmt.Println("Context cancelled")
}
```

### Context WithValue (Request-Scoped Data)
```go
ctx := context.WithValue(context.Background(), "userID", "123")

userID := ctx.Value("userID").(string)  // "123"
```

### Error Wrapping
```go
// ❌ SAI — mất context
return nil, err

// ✅ ĐÚNG — wrap error
return nil, fmt.Errorf("processUser(%s): %w", userID, err)
```

**Key:** `%w` = wrap error chain, `%v` = chỉ text

---

## Summary — 10 Concepts Quan Trọng Nhất

| # | Concept | Dùng |
|---|---|---|
| 1 | `:=` vs `var` | Khai báo biến |
| 2 | Pointer `&` `*` | Sửa gốc |
| 3 | Struct + Method | Dữ liệu + hành động |
| 4 | Interface | Polymorphism |
| 5 | Slice = reference | Dùng đúng |
| 6 | Map + range | Key-value collection |
| 7 | Goroutine + Channel | Concurrent |
| 8 | WaitGroup | Đợi worker xong |
| 9 | Context | Deadline + Cancel + Values |
| 10 | Defer + Error Wrapping | Cleanup + Context error |

---

## Khi Nào Dùng Cái Nào?

| Tình Huống | Dùng |
|---|---|
| Dữ liệu nhóm | Struct |
| Sửa dữ liệu trong function | Pointer receiver |
| Hành động khác nhau, cùng interface | Interface |
| Xử lý nhiều task song parallel | Goroutine + Channel |
| API chậm, cần timeout | Context WithTimeout |
| Resource (file, DB) | Defer close |

---

## Files Created

- `day1/main.go` — Variables, Functions, If/For, Error
- `day2/struct.go`, `interface.go`, `pointer.go` — Pointer, Struct, Interface
- `day3/main.go`, `utils/math.go` — Slice, Map, Package
- `day4/main.go` — Goroutine, Channel, WaitGroup
- `day5/main.go` — Context, Defer, Error Wrapping

---

**Status:** ✅ 5 Days Complete — Ready for Day 6 (Gin REST API)
