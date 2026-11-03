# pm-services — Tổng quan hệ thống (Interview Reference)

## Tên hệ thống
**MAX — Meperia Automated Exchange**
Hệ thống quản lý Purchase Order (PO) cho ngành y tế, kết nối giữa bệnh viện (client) và nhà cung cấp (vendor). Xử lý toàn bộ vòng đời của đơn hàng: tạo PO → xác nhận → theo dõi ngoại lệ → giao hàng → hóa đơn.

---

## Kiến trúc tổng thể

| Thành phần | Chi tiết |
|---|---|
| Kiến trúc | Modular Monolith — dễ tách thành microservices sau |
| Design pattern | Clean Architecture (Domain → Application → Infrastructure → Interface) |
| Multi-tenant | Row Level Security (RLS) trên PostgreSQL — mỗi tổ chức cô lập dữ liệu |
| Communication | Event-driven nội bộ qua EventBus; bên ngoài qua Kafka |

---

## Tech Stack & Mục đích

| Công nghệ | Dùng cho | Mục đích |
|---|---|---|
| **Go 1.25** | Toàn bộ backend | Performance cao, concurrency tốt cho xử lý EDI file lớn |
| **Gin** | HTTP framework | Router, middleware, bind/validate request |
| **PostgreSQL 15** | Database chính | Lưu PO, vendor, contract, exception — có RLS multi-tenant |
| **Redis 7** | Cache + Job Queue | Cache master data; Asynq dùng Redis làm queue cho background job |
| **Apache Kafka** | Message broker | Nhận EDI file từ vendor, pub/sub event giữa worker và consumer |
| **OpenSearch** | Full-text search | Search PO, filter phức tạp — thay thế LIKE query trên PostgreSQL |
| **AWS S3** | File storage | Lưu EDI file, media, export Excel |
| **Asynq** | Background job queue | Gửi email, sync data, scheduled task — dùng Redis làm backend |
| **JWT** | Authentication | Stateless auth, refresh token, multi-tenant context |
| **Prometheus** | Metrics | Monitor health của service |
| **Zap** | Structured logging | JSON log với request ID, user context |

---

## Các Module chính

### 1. `po` — Purchase Order (module lớn nhất)
**Tính năng:**
- Quản lý PO header và PO lines
- Acknowledgement (xác nhận từ vendor — chuẩn EDI 855)
- So sánh giá PO vs Contract vs ACK — phát hiện chênh lệch
- Quản lý shipment (ASN — Advanced Ship Notice, chuẩn EDI 856)
- Quản lý invoice (chuẩn EDI 810)
- Exception detection: phát hiện 15+ loại ngoại lệ (giá sai, số lượng sai, UOM sai, giao trễ, thiếu ASN...)
- Dashboard: thống kê PO theo status, exception summary

**Công nghệ đặc biệt:** OpenSearch để search/filter PO; Kafka để nhận EDI; Asynq để xử lý async

---

### 2. `auth` — Authentication
**Tính năng:**
- Login, logout, refresh token
- JWT với multi-tenant context (org_id trong token)
- Role-based access: Admin, Manager, User

---

### 3. `edi` — EDI File Processing
**Tính năng:**
- Parse file EDI 855 (PO Acknowledgement từ vendor)
- Parse file EDI 856 (ASN — thông báo giao hàng)
- Parse file EDI 810 (Invoice)
- Validate và map vào database

**Workflow:**
```
EDI file → S3 → Kafka message → worker-consumer → parse → lưu DB → trigger exception check
```

---

### 4. `notification` — Thông báo
**Tính năng:**
- Gửi notification khi có exception mới
- Trigger từ PO events (giá thay đổi, assignee thay đổi...)
- Async qua Asynq (không block request)

---

### 5. `history` — Audit Log
**Tính năng:**
- Lưu toàn bộ lịch sử thay đổi của PO, PO lines, giá, assignee
- Event-driven: mỗi thay đổi publish event → history subscriber lưu lại
- Dùng để audit trail và dispute resolution

---

### 6. `corporation` — Tổ chức (Tenant)
**Tính năng:**
- Quản lý danh sách corporation (bệnh viện, tổ chức mua hàng)
- Root của multi-tenant isolation

---

### 7. `client_vendor` — Quan hệ Client-Vendor
**Tính năng:**
- Mapping giữa client (bệnh viện) và vendor (nhà cung cấp)
- Quản lý assignee cho từng PO line

---

### 8. `permission` — Phân quyền
**Tính năng:**
- RBAC (Role-Based Access Control)
- Fine-grained permission cho từng action

---

### 9. `setting` — Cài đặt hệ thống
**Tính năng:**
- Config exception threshold (khi nào raise exception)
- Config auto-refresh interval cho dashboard
- Cài đặt per-organization

---

### 10. `sync` — Đồng bộ dữ liệu
**Tính năng:**
- Sync master data (item, vendor, contract) từ hệ thống ngoài (MMIS/MSS)
- Chạy theo schedule qua Asynq

---

### 11. `vendorperformance` — Đánh giá vendor
**Tính năng:**
- Tính điểm performance của vendor dựa trên: tỷ lệ exception, on-time delivery, ACK rate

---

### 12. `tickets` — Tích hợp Jira
**Tính năng:**
- Tạo Jira ticket từ exception
- POC tích hợp vendor với hệ thống ticket nội bộ

---

### 13. `mss_integration` — Tích hợp MSS/MMIS
**Tính năng:**
- Kết nối với hệ thống quản lý bệnh viện (MSS/MMIS)
- Sync PO change từ MMIS vào hệ thống

---

### 14. `comment` — Bình luận
**Tính năng:**
- Comment trên PO, PO line
- Infinite scroll, phân trang server-side

---

### 15. `media` — File đính kèm
**Tính năng:**
- Upload file đính kèm vào PO
- Lưu trên AWS S3

---

## Entry Points (cmd/)

| Command | Làm gì |
|---|---|
| `cmd/api` | HTTP server chính — serve REST API cho frontend |
| `cmd/worker-producer` | Watch EDI file từ S3, publish message lên Kafka |
| `cmd/worker-consumer` | Consume message từ Kafka, xử lý EDI, lưu DB |
| `cmd/worker-job` | Chạy scheduled job qua Asynq (email, sync, cleanup) |
| `cmd/opensearch-bootstrap` | Khởi tạo index mapping cho OpenSearch |
| `cmd/migrate-gorm` | Chạy database migration |

---

## Workflow EDI theo từng loại file

### EDI 850 — Purchase Order (Outbound: hệ thống → vendor)

EDI 850 là chiều **gửi đi** — hệ thống tạo PO rồi gửi cho vendor biết cần mua gì.

```
Buyer tạo PO trên hệ thống (nhập tay hoặc import từ MMIS)
        ↓
   Lưu PO vào PostgreSQL
        ↓
Hệ thống generate file EDI 850 → lưu lên S3 (folder "orders")
        ↓
worker-producer detect file 850 → publish Kafka message (ProcessType: "850")
        ↓
worker-consumer nhận → gửi file 850 đến EDI system của vendor
        ↓
Vendor nhận được PO → xử lý → gửi lại EDI 855 (ACK)
```

---

### EDI 855 — PO Acknowledgement (Inbound: vendor → hệ thống)

EDI 855 là chiều **nhận về** — vendor xác nhận có thể giao hàng hay không, giá bao nhiêu.

```
Vendor gửi EDI 855 file
        ↓
   Lưu vào S3
        ↓
worker-producer detect → publish Kafka message (ProcessType: "855")
        ↓
worker-consumer nhận → parse EDI → lưu acknowledgement vào DB
        ↓
Exception engine chạy: so sánh ACK vs PO → phát hiện ngoại lệ (giá sai, số lượng sai...)
        ↓
Notification service → gửi thông báo cho buyer (async qua Asynq)
        ↓
History service → lưu audit log
        ↓
OpenSearch sync → update index để frontend search được ngay
```

---

### EDI 856 — ASN Shipment Notice (Inbound: vendor → hệ thống)

EDI 856 là thông báo **giao hàng** — vendor báo đã gửi hàng, giao bao nhiêu, khi nào đến.

```
Vendor gửi EDI 856 file (khi hàng đã xuất kho)
        ↓
   Lưu vào S3
        ↓
worker-producer detect → publish Kafka message (ProcessType: "856")
        ↓
worker-consumer nhận → parse → lưu shipment_items vào DB (link với po_lines)
        ↓
Exception engine chạy: so sánh ASN vs PO → phát hiện shortage, over-shipment, late delivery
        ↓
Notification + History + OpenSearch sync
```

---

### EDI 810 — Invoice (Inbound: vendor → hệ thống)

EDI 810 là **hóa đơn** — vendor gửi bill sau khi giao hàng.

```
Vendor gửi EDI 810 file
        ↓
   Lưu vào S3
        ↓
worker-producer detect → publish Kafka message (ProcessType: "810")
        ↓
worker-consumer nhận → parse → lưu edi_invoice_lines vào DB
        ↓
Exception engine chạy: so sánh Invoice vs PO → phát hiện price_inv, quantity_inv, uom_inv
        ↓
Notification + History + OpenSearch sync
```

---

## Exception Types (15+ loại)

| Loại | Mô tả |
|---|---|
| `unacknowledged` | Vendor chưa ACK PO |
| `price` | Giá ACK ≠ giá PO |
| `quantity` | Số lượng ACK ≠ PO |
| `uom` | Đơn vị đo lường không khớp |
| `backorder` | Vendor báo hàng backorder |
| `missing_asn` | Vendor không gửi ASN trước deadline |
| `late_delivery` | Giao hàng trễ so với ASN |
| `shortage_shipment` | Giao thiếu hàng |
| `over_shipment` | Giao dư hàng |
| `price_inv` | Giá hóa đơn ≠ giá PO |
| `price_itm` | Chênh lệch giá ở cấp item |
| `price_ctr` | Chênh lệch giá so với contract |

---

## Điểm nổi bật để kể trong interview

1. **Multi-tenant với RLS**: Mỗi organization hoàn toàn cô lập dữ liệu ở tầng database — không cần filter bằng code, PostgreSQL tự enforce.

2. **Event-driven async**: Thay vì gọi trực tiếp, các module giao tiếp qua EventBus nội bộ — dễ tách thành microservices sau.

3. **Kafka cho EDI pipeline**: File EDI từ vendor đến hệ thống không đồng bộ — Kafka đảm bảo không mất message kể cả khi consumer down.

4. **OpenSearch cho search phức tạp**: PO có nhiều filter (status, exception type, vendor, date range...) — dùng OpenSearch thay vì N+1 query PostgreSQL.

5. **Asynq cho background job**: Gửi email, sync data không block request — Redis-backed, có retry tự động.
