---
title: Checklist IP & Code Review Security cho dự án BMad/SDD
header: Bestarion — Nội bộ, bản nháp để review
---

# Checklist IP & Code Review Security

Tài liệu chuẩn bị cho việc áp dụng BMad + SDD vào quy trình sản xuất phần mềm.
Phạm vi: dự án outsourcing, stack Golang / React-Vite-TypeScript / Ruby on Rails,
code được sinh một phần bằng AI agent.

Trạng thái: **bản nháp, cần review và bổ sung thông tin hợp đồng.**

## 0. Bối cảnh và giả định đang dùng

| Yếu tố | Trạng thái |
| --- | --- |
| Loại dự án | Outsourcing cho khách (đã xác nhận) |
| Stack | Golang, React + Vite + TypeScript, Ruby on Rails, Elasticsearch |
| Quy trình | BMad + SDD, code sinh bằng AI agent |
| Mô hình phân phối | **Chưa biết** → tạm giả định *có phân phối* (nghiêm ngặt nhất) |
| Compliance | **Chưa biết** → tạm giả định *có PHI* (HIPAA-adjacent) |

### Rủi ro nền quyết định toàn bộ thiết kế bên dưới

Hợp đồng outsourcing thường có điều khoản **warranty & indemnity**: bên làm cam kết
sản phẩm giao không vi phạm quyền sở hữu trí tuệ của bên thứ ba, và bồi thường cho
khách nếu phát sinh tranh chấp.

Cộng với đặc điểm của LLM là được train trên mã nguồn mở, code do agent sinh ra có thể
trùng khớp với project có license copyleft mà không đi qua bất kỳ file manifest nào.
Hệ quả: **rủi ro pháp lý nằm ở phía công ty làm, không phải phía khách.** Đây là lý do
nhóm kiểm soát về IP trong tài liệu này được xếp ngang hàng với nhóm bảo mật, chứ
không phải phụ lục.

### Ba thay đổi về bản chất khi dùng AI agent

1. **Tốc độ sinh code vượt tốc độ review của người.** Một agent có thể tạo hai nghìn
   dòng trong một story. Nếu cổng kiểm soát duy nhất là "người đọc PR" thì nó sẽ vỡ.
   Vì vậy phần lớn checklist phải là gate tự động, chỉ giữ lại cho người những gì
   máy không phán đoán được.
2. **Nguồn gốc code không còn rõ ràng.** SCA truyền thống đọc manifest nên hoàn toàn
   không thấy loại rủi ro này; cần thêm lớp kiểm tra ở mức nội dung code.
3. **Spec trở thành nguồn sự thật.** Đây là điểm mạnh của SDD: yêu cầu về IP và bảo mật
   có thể được đưa vào spec và tài liệu kiến trúc, thay vì bị phát hiện muộn ở PR.

## 1. Bảy cổng kiểm soát

Nhãn `G0`–`G6` được dùng lại ở phần checklist để chỉ nơi từng nhóm được chạy.

### G0 — Trước khi bật AI agent (một lần, đang chặn)

**Ai làm:** bạn + techlead + PM / account manager. **Tool:** không có, đây là việc đọc hợp đồng.

- Đọc MSA / SOW / NDA: điều khoản về **AI tools** (cấm, hay yêu cầu khai báo), **IP ownership**, **indemnity**, **deliverable**
- Xác định policy license thuộc quyền quyết định của công ty hay của khách; nếu của khách thì soạn đề xuất và xin xác nhận qua email
- Carve-out cho background IP, để thư viện nội bộ tái sử dụng không bị chuyển giao hết cho khách
- Ràng buộc IP và AI policy áp cho cả intern và freelancer

Đây là cổng **đang chặn**. Nếu hợp đồng có điều khoản cấm AI tools mà team đã dùng
Cursor, cần biết ngay để xử lý.

### G1 — Spec & Architecture (BMad Phase 1–3)

**Ai làm:** Analyst / PM / Architect / PO. **Tool:** không, đây là việc viết tài liệu.

Đây là cổng có đòn bẩy cao nhất và cũng hay bị bỏ qua nhất. Các quyết định sau nên được
ghi vào `architecture.md` và `tech-stack.md` để Dev agent luôn load được context:

- License allowlist và denylist (nội dung ở mục 4)
- Security standard theo từng stack (các item đặc thù Go / Vite / Rails ở mục 3)
- Yêu cầu audit log, mã hóa at rest, masking dữ liệu ở môi trường non-prod
- Quy tắc: mọi dependency mới đều phải được duyệt

**Checklist IP chạy ở phase này**, không phải ở PR, vì quyết định license là quyết định
kiến trúc; phát hiện ở PR thì đã muộn.

### G2 — Khi dev viết hoặc sinh code (local, pre-commit)

**Ai làm:** Dev. **Tool:** `gitleaks`, linter, type check.

- `gitleaks` ở pre-commit hook, chặn secret trước khi vào git history — xóa commit sau đó không đủ, phải rotate key
- Lint, format, `tsc --noEmit`, `go vet`
- Dev đọc lại toàn bộ diff của agent trước khi mở PR

### G3 — Mỗi Pull Request (cổng nặng nhất)

**Ai làm:** CI tự động, sau đó AI review lớp 1 và con người lớp 2.

Phần tự động, bắt buộc xanh mới merge được:

| Kiểm gì | Tool | Áp cho |
| --- | --- | --- |
| CVE + secret + license mức package | **Trivy** | cả 3 stack, một lệnh |
| Lỗ hổng đã biết của Go | `govulncheck` | Golang |
| SAST | `gosec`, `staticcheck` | Golang |
| SAST | Semgrep OSS, `eslint-plugin-security` | React / Vite / TS |
| SAST | Brakeman (xem lưu ý license ở mục 5) | Rails |
| CVE của gem | `bundler-audit` | Rails |
| Secret | `gitleaks` | cả 3 |
| Dấu vết code sao chép | script grep `Copyright`, `SPDX-License-Identifier`, `GPL`, `Licensed under` trong diff | cả 3 |
| Secret lọt vào bundle | grep tên biến `VITE_*` chứa `KEY` / `SECRET` / `TOKEN` / `PASSWORD` | React / Vite |
| Test và coverage không giảm | test runner sẵn có | cả 3 |

Sau khi CI xanh, con người chạy checklist ở mục 3.

### G4 — Nightly

**Ai làm:** CI theo schedule. **Tool:** Trivy image scan, Trivy config cho IaC.

Dành cho những việc chậm, không nên đặt ở PR: quét container image, quét IaC,
quét full dependency tree.

### G5 — Mỗi release và mỗi bản giao khách

**Ai làm:** techlead + PM. **Tool:** **ORT**, hoặc chỉ Trivy nếu chỉ cần SBOM.

- Sinh **SBOM** định dạng CycloneDX hoặc SPDX — Trivy làm được bằng `trivy fs --format cyclonedx`
- Sinh **file NOTICE / THIRD-PARTY-LICENSES** — đây mới là chỗ thực sự cần ORT
- Đóng gói hồ sơ: SBOM, báo cáo scan, registry các exception đã duyệt kèm lý do, người duyệt, ngày hết hạn
- Lưu trữ theo thời hạn hợp đồng, thường là 3 đến 7 năm

Đề xuất: SBOM và NOTICE nên là **hạng mục giao hàng ghi trong SOW**, không phải tài liệu nội bộ.

### G6 — Audit theo milestone (tùy chọn, khách chi trả)

**Tool:** Black Duck hoặc audit của bên thứ ba, **không mua license thường niên**.

Đây là cách xử lý khoảng trống snippet matching mà không tốn chi phí công ty: nếu khách
yêu cầu bảo đảm về IP, đề xuất một hạng mục riêng là "IP / license audit tại các mốc
milestone" do khách chi trả. Khách là bên hưởng lợi từ sự bảo đảm đó nên việc họ trả
cho nó là hợp lý.

<!-- pagebreak -->

## 2. Checklist 1 — Intellectual Property

### 2.1 Quyền và hợp đồng (G0)

- [ ] MSA / SOW có điều khoản nào về AI coding assistant? Cấm, hay yêu cầu khai báo?
- [ ] Nếu cần chấp thuận: đã có văn bản khách đồng ý, kèm danh sách tool cụ thể
- [ ] Ai sở hữu work product — được ghi thành câu trong SOW, không để mặc định
- [ ] Legal xác nhận: ở một số nước, tác phẩm do AI sinh thuần túy có thể không được bảo hộ bản quyền
- [ ] Nhân sự, kể cả intern và freelancer, đã ký IP assignment và AI usage policy
- [ ] Có allowlist các tool AI được duyệt; muốn thêm tool phải xin duyệt

### 2.2 Chống rò rỉ IP và dữ liệu qua model (G0 thiết lập, G2 tuân thủ hằng ngày)

- [ ] Cursor bật Privacy Mode / zero data retention, có bằng chứng bằng văn bản
- [ ] Legal đã review terms và DPA của model provider; kiểm tra data residency nếu khách yêu cầu
- [ ] `.cursorignore` loại trừ secret, config production, dữ liệu khách khỏi phạm vi index
- [ ] **Không đưa dữ liệu thật vào prompt.** Nếu là PHI, việc gửi cho model provider có thể cần chính provider nằm trong phạm vi BAA — điều mà terms tiêu chuẩn không đáp ứng. Đây là ranh giới pháp lý cứng, không phải best practice
- [ ] Tách workspace theo từng khách; code của khách A không xuất hiện trong context khi làm cho khách B

### 2.3 Provenance của code do AI sinh ra (G3)

- [ ] Grep diff tìm dấu hiệu code sao chép: `Copyright`, `SPDX-License-Identifier`, `Licensed under`, `GPL`, `@license`
- [ ] Khối code liền mạch từ khoảng 20–50 dòng trở lên trùng khớp một project OSS thì phải điều tra: viết lại, tuân thủ license, hoặc xin exception
- [ ] Cấm copy trực tiếp từ Stack Overflow — nội dung ở đó là CC BY-SA, tức có nghĩa vụ ghi công và share-alike, xung đột với sản phẩm closed-source
- [ ] Mỗi commit có một con người chịu trách nhiệm (`Reviewed-by`); không merge commit do bot tạo mà chưa ai duyệt
- [ ] Lưu vết truy xuất story ID → spec / prompt → file, tận dụng `Dev Agent Record` và `File List` của BMad

### 2.4 License của dependency (G1 policy, G3 thi hành)

- [ ] Có license policy ở dạng máy đọc được (nội dung ở mục 4)
- [ ] Scan cả transitive dependency, không chỉ direct — phần lớn rủi ro nằm ở tầng sâu
- [ ] **Chống hallucinated và typosquat package.** Agent thường đề xuất thư viện không tồn tại hoặc tên gần giống thư viện thật, và kẻ tấn công đã đăng ký sẵn những tên đó. Mỗi dependency mới phải kiểm repo gốc, số download, ngày publish đầu tiên, maintainer
- [ ] Lockfile được commit; CI cài bằng `--frozen-lockfile` hoặc `bundle install --deployment`
- [ ] Cảnh giác các package thương mại mà agent hay tự cài: **AG Grid Enterprise, Highcharts, FullCalendar Premium, FontAwesome Pro, Syncfusion**. Chúng cài được không cần key nhưng dùng trong sản phẩm thương mại là vi phạm license

### 2.5 Asset không phải code (G5)

- [ ] Font, icon, ảnh, video, âm thanh có license cho mục đích thương mại. Ví dụ cụ thể: **Calibri là font độc quyền của Microsoft, không được embed vào sản phẩm phân phối**; dùng Carlito nếu cần metric tương đương
- [ ] Dataset dùng để test hoặc train có license phù hợp
- [ ] Nội dung do AI sinh (text, hình ảnh) cũng có rủi ro trùng tác phẩm có bản quyền
- [ ] Trademark: tên sản phẩm và module không trùng nhãn hiệu đã đăng ký

### 2.6 Bằng chứng và lưu trữ (G5)

- [ ] Mỗi release lưu đủ bộ: SBOM, báo cáo license scan, báo cáo security scan, registry exception đã duyệt
- [ ] Thời hạn lưu tối thiểu bằng thời hạn hợp đồng — đây là hồ sơ khách đòi khi audit
- [ ] Có playbook xử lý khi phát hiện vi phạm: ai quyết định, trong bao lâu, có phải thông báo khách không

<!-- pagebreak -->

## 3. Checklist 2 — Code Review và Security

### 3.1 Luật chơi riêng cho code do AI sinh (G1 thiết kế, G3 thi hành)

- [ ] PR dưới khoảng 400 dòng. Việc này thuộc Scrum Master khi chia story, không phải việc của reviewer
- [ ] Reviewer hiểu code mới approve. Không giải thích được thì không merge, dù test đã xanh
- [ ] AI review là lớp 1, con người là lớp 2. Không để AI approve AI
- [ ] **Review diff của file test kỹ hơn cả code.** Kiểm tra có assertion nào bị gỡ, có `skip` mới, có mock hết khiến test vô nghĩa. Agent hay sửa test cho pass thay vì sửa bug
- [ ] Không còn TODO, placeholder, `not implemented`, dữ liệu fake hard-code
- [ ] Không viết lại util đã tồn tại — agent hay viết mới thay vì tìm

### 3.2 Truy xuất theo spec, đặc thù SDD (G3)

- [ ] PR link tới story hoặc spec ID
- [ ] Mọi Acceptance Criteria có test tương ứng, và mọi test map được về một AC
- [ ] Không có chức năng nào ngoài spec — scope creep do agent tự "làm thêm cho đủ"
- [ ] Nếu implementation lệch khỏi `architecture.md` thì phải cập nhật doc hoặc có ADR
- [ ] `File List` trong story khớp với diff thực tế

### 3.3 Security chung (G3)

Sắp theo tần suất mắc lỗi của code do AI sinh, không theo thứ tự OWASP.

- [ ] **Authorization và IDOR** — lỗi số một. Agent thường chỉ kiểm tra đã đăng nhập chưa mà quên kiểm tra user có quyền trên chính object đó không
- [ ] **Injection** — không nội suy chuỗi vào query; mọi raw query phải được review riêng
- [ ] **Input validation** — allowlist, strong params, không mass-assignment
- [ ] **Secret** không hard-code; nếu đã lộ thì phải rotate
- [ ] **XSS** — `html_safe` và `dangerouslySetInnerHTML` phải có lý do được viết ra
- [ ] **Crypto** — bcrypt hoặc argon2 cho password, không tự viết crypto, **không tắt TLS verification**
- [ ] **Cấu hình bị nới lỏng để cho chạy được**: CORS `*` kèm credentials, `--no-sandbox`, debug mode, chmod 777, container chạy root. Đây là pattern rất đặc trưng của code AI sinh
- [ ] SSRF (URL do user nhập phải qua allowlist), file upload (type, size, path traversal), deserialization
- [ ] CSRF token; cookie có `HttpOnly`, `Secure`, `SameSite`
- [ ] Rate limiting cho endpoint auth và endpoint tốn tài nguyên
- [ ] Security headers: CSP, HSTS, X-Content-Type-Options
- [ ] Log không chứa PII / PHI / token; có audit log cho hành động nhạy cảm
- [ ] Nếu sản phẩm có tính năng AI thì thêm OWASP LLM Top 10: prompt injection, insecure output handling, rò rỉ dữ liệu qua model
- [ ] Bảo vệ chính pipeline: agent không có credential production, không được tự merge (chống indirect prompt injection qua issue comment hoặc nội dung web)

### 3.4 Đặc thù Golang (G3)

- [ ] **`math/rand` dùng để sinh token, ID hoặc password** — phải là `crypto/rand`. Agent mắc lỗi này rất thường xuyên
- [ ] Context có timeout ở mọi lời gọi ra ngoài: DB, HTTP, Elasticsearch
- [ ] Error không bị bỏ qua bằng `_` ở chỗ ghi dữ liệu
- [ ] `defer resp.Body.Close()` không bị thiếu
- [ ] Ép kiểu số có khả năng overflow ở chỗ tính số lượng hoặc giá
- [ ] `go.sum` được commit, không tắt checksum verification
- [ ] **Go link tĩnh nên LGPL trong Go tương đương GPL** — phải chặn thẳng, không để ở nhóm cần review

### 3.5 Đặc thù React + Vite + TypeScript (G3)

- [ ] **Biến môi trường tiền tố `VITE_` được nhúng thẳng vào bundle gửi cho browser.** Không đặt secret ở đó. Nên có CI check riêng cho việc này
- [ ] **Source map không được ship lên production** (`build.sourcemap: false`) — vừa là lỗ hổng bảo mật vừa là rò rỉ IP của khách, vì source map cho phép dựng lại gần như toàn bộ source code
- [ ] `dangerouslySetInnerHTML` phải có DOMPurify hoặc lý do được viết ra
- [ ] Bật `strict: true`; cấm `any` và `@ts-ignore` trong code mới. Agent dùng chúng để cho compile được, và việc đó xóa mất chính lớp bảo vệ mà TypeScript mang lại
- [ ] Không có quyết định phân quyền nào chỉ nằm ở frontend — ẩn nút không phải là authorization

### 3.6 Đặc thù Ruby on Rails (G3)

- [ ] **IDOR** — phải là `current_user.hospital.items.find(params[:id])`, không phải `Item.find(params[:id])`. Đọc từng query trong controller mới
- [ ] **Serializer không phơi quá nhiều cột.** `render json: @record` hoặc `as_json` không giới hạn field sẽ trả về toàn bộ column, kể cả field nhạy cảm thêm vào sau này
- [ ] Strong params đầy đủ, không mass-assignment
- [ ] Không `where("... #{params[:x]}")`
- [ ] Phân quyền tập trung bằng Pundit hoặc CanCanCan, không rải `if current_user.admin?` khắp controller
- [ ] N+1 query — cài `bullet` ở môi trường test và cho fail CI. Rails cộng agent gần như luôn sinh N+1
- [ ] Migration an toàn, dùng `strong_migrations`, không lock bảng lớn
- [ ] **Query Elasticsearch cũng phải filter theo tenant hoặc bệnh viện.** Chỗ này lọt rất thường xuyên vì scope thường chỉ được cài ở tầng ActiveRecord

### 3.7 Chính sách severity và SLA (G3)

| Mức | Xử lý |
| --- | --- |
| Critical / High | Chặn merge, sửa ngay |
| Medium | Sửa trong sprint hiện tại |
| Low | Đưa vào backlog có nhãn |
| Exception | Phải có người duyệt cụ thể, lý do, và ngày hết hạn; ghi vào registry và review lại định kỳ |

### 3.8 Bổ sung vào Definition of Done (G3)

Thêm vào `story-dod-checklist.md` của BMad:

- [ ] Tất cả gate CI xanh
- [ ] Có con người (không phải AI) approve
- [ ] Không phát sinh secret mới
- [ ] Dependency mới đã được duyệt license
- [ ] SBOM đã cập nhật
- [ ] Doc hoặc ADR đã cập nhật nếu lệch kiến trúc

## 4. License policy chốt được ngay

Dùng giả định nghiêm ngặt, tức coi như có phân phối.

| Nhóm | Danh sách |
| --- | --- |
| **Cho phép** | MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause, ISC, Zlib, Unlicense, MPL-2.0 |
| **Chặn** | GPL-2.0, GPL-3.0, AGPL-3.0, **LGPL mọi phiên bản**, SSPL, BUSL, CC BY-NC, CC BY-SA, và **unknown / no license** |
| **Review từng ca** | Các package thương mại (xem mục 2.4) |

Lý do LGPL bị chặn thẳng thay vì để ở nhóm cần review: Go link tĩnh dependency vào
binary, và Vite bundle toàn bộ dependency vào file JS gửi cho browser. Cả hai đều làm
mất cơ chế dynamic linking mà LGPL dựa vào để giới hạn phạm vi copyleft.

Ghi chú về mô hình phân phối, để khi biết câu trả lời thì điều chỉnh policy:

- **Khách tự vận hành, mình giao artifact** (source, Docker image, installer, hoặc chỉ một file `docker-compose.yml` kèm image) — đây **là** distribution. GPL và LGPL kích hoạt đầy đủ
- **Mình hoặc khách host, người dùng truy cập qua web** — GPL phần lớn không kích hoạt, **nhưng AGPL-3.0 thì có**: chỉ cần cho người dùng truy cập qua network là đã phát sinh nghĩa vụ cung cấp source. SSPL còn nặng hơn

## 5. Quyết định về tool

### 5.1 Năm tool techlead gửi

| Tool | License của chính nó | Quyết định | Lý do |
| --- | --- | --- | --- |
| **Aqua Trivy** | Apache-2.0 | **Chọn**, làm gate chính | Một binary, không cần server, quét được `go.sum` + `package-lock.json` + `Gemfile.lock` trong một lệnh |
| **OSS Review Toolkit** | Apache-2.0 | **Chọn**, ở G5 | Tool duy nhất sinh được file NOTICE / attribution cho bản giao khách |
| **ScanCode.io** | Apache-2.0 | **Tạm gác** | Trùng vai với ORT; cần dựng server Postgres + Docker |
| **Aikido Security** | Không open source | **Bỏ** | 10–25 USD mỗi dev mỗi tháng, trái tiêu chí ưu tiên open source |
| **Black Duck** | Thương mại | **Bỏ**, giữ lại ở G6 | Từ 10.000 USD mỗi năm; dùng dạng audit do khách chi trả |

Với team khoảng 10 người, Aikido rơi vào tầm 1.200–3.000 USD mỗi năm, Black Duck từ
10.000 USD mỗi năm. Bộ miễn phí là 0 đồng tiền license, nhưng đổi lại là **chi phí
người**: khoảng 1–2 tuần dựng ban đầu và 2–4 giờ mỗi tháng để triage kết quả. Nên nói
rõ con số này khi trình bày, để không bị phản biện là "free mà không tính công".

### 5.2 Vì sao Trivy là lựa chọn số một

Điểm mạnh quyết định trong trường hợp này là stack có tới ba ngôn ngữ. Trivy đọc lockfile
của cả ba nên chỉ cần một workflow duy nhất thay vì ba pipeline riêng. Ngoài CVE, nó còn
làm được ba việc mà bảng của techlead không ghi:

- Quét secret trong source
- Quét license ở mức package
- **Sinh SBOM** ở định dạng CycloneDX hoặc SPDX

Việc cuối cùng khá quan trọng về mặt tiết kiệm: nếu Trivy đã sinh được SBOM thì **chưa
cần dựng ORT ngay**. ORT chỉ thực sự cần khi phải sinh file NOTICE để kèm bản giao khách,
và khi cần workflow curation để xử lý các case license mà scanner đoán sai. ORT chạy trên
JVM, cấu hình theo bốn bước analyzer → scanner → evaluator → reporter, đường học khá dốc,
nên đừng dựng ở tuần đầu.

### 5.3 Vì sao tạm gác ScanCode.io

ORT và ScanCode.io chồng vai nhau, và ORT thường dùng ScanCode Toolkit làm scanner backend,
nên chọn ORT là đã có năng lực của ScanCode ở bên trong. Dựng cả hai là trùng lặp công sức.

Tiêu chí phân biệt nếu sau này cần chọn lại: **ORT** khi mục tiêu là artifact giao khách và
chạy trong CI; **ScanCode.io** khi mục tiêu là để legal hoặc PM tự vào xem kết quả qua web
UI và quét ở mức file trên cả Docker image hay bản build đã đóng gói.

Lưu ý nhỏ: phần **dữ liệu** license của ScanCode là CC-BY-4.0, khác với code là Apache-2.0.
Dùng nội bộ thì không sao, nhưng nếu redistribute dataset đó thì cần ghi attribution.

### 5.4 Bộ tool này thiếu hẳn nhóm SAST

Đây là điểm đáng nêu nhất khi phản hồi techlead: cả năm tool trong hình đều thuộc họ
SCA / license. Chúng phát hiện "đang dùng thư viện có CVE hoặc license xấu", nhưng **không
phát hiện được lỗi bảo mật trong code mà agent vừa viết** — mà đó mới là rủi ro lớn nhất
của workflow BMad. Cần bổ sung, tất cả đều miễn phí:

| Stack | SAST | CVE chuyên biệt | License |
| --- | --- | --- | --- |
| Golang | `gosec`, `staticcheck`, `go vet` | `govulncheck` (chính chủ Go team) | `go-licenses` |
| React / Vite / TS | Semgrep OSS, `eslint-plugin-security` | `npm audit`, Dependabot | Trivy |
| Rails | Brakeman, `rubocop-security` | `bundler-audit` | `license_finder` |
| Chung | — | Trivy | Trivy |

Thêm `gitleaks` cho secret, chạy cả ở pre-commit hook.

### 5.5 Hai lưu ý về license của chính các tool

**Nguyên tắc chung:** license của tool **không lây sang sản phẩm của khách**, miễn là chỉ
chạy nó như một chương trình riêng biệt trong CI, không link vào code và không phân phối
lại. Nên `bundler-audit` là GPL-3.0 hay Semgrep OSS là LGPL-2.1 đều hoàn toàn không tạo
nghĩa vụ gì cho bản giao khách.

**Ngoại lệ đáng lưu ý là Brakeman.** Từ 15/6/2018, Brakeman không còn là MIT mà dùng
"Brakeman Public Use License" thuộc Synopsys, miễn phí cho non-commercial use, trong đó
liệt kê ví dụ về commercial use là "dùng software như một thành phần của dịch vụ hoặc sản
phẩm có giá trị gia tăng". Tác giả Justin Collins đã xác nhận công khai rằng quét code của
chính mình hoặc của công ty mình **không** tính là commercial use, kể cả khi code đó là
proprietary; mục đích thật của điều khoản là ngăn đối thủ dựng sản phẩm cạnh tranh trên
Brakeman.

Với công ty outsourcing quét code của khách như một phần dịch vụ có thu phí, trường hợp
này gần ranh giới hơn một team in-house, dù khả năng cao vẫn thuộc diện được phép. Hai
cách xử lý để không còn chỗ nào để hỏi: email tác giả xin xác nhận bằng văn bản (license
ghi rõ họ có thể cấp commercial license miễn phí), hoặc dùng Semgrep ruleset cho Rails.

### 5.6 Khoảng trống đã biết, đừng hứa là đã đóng

Bộ tool 0 đồng **không** phát hiện được code AI sinh trùng với project copyleft ở mức
snippet. ScanCode giỏi phát hiện license trong file, nhưng snippet matching cần dựng thêm
PurlDB / MatchCode và độ phủ vẫn kém xa cơ sở dữ liệu của Black Duck.

Ba cách xử lý mà không phải mua Black Duck:

1. **Chuyển từ phát hiện sang phòng ngừa.** Buộc PR nhỏ, cấm copy-paste, grep license header trong CI, và quy tắc không hiểu thì không merge. Rẻ nhất và hiệu quả bất ngờ, vì phần lớn code AI copy nguyên khối đều kéo theo dấu vết nhận biết được
2. **Đẩy chi phí sang khách hàng** dưới dạng hạng mục audit theo milestone trong SOW
3. **Audit một lần trước bản giao lớn** thay vì mua license thường niên

## 6. Lộ trình triển khai

1. **Tuần 1 — Trivy trong CI.** Một file workflow, cover cả ba stack, cho ra CVE + secret + license + SBOM. Khoảng 80% giá trị với 5% công sức. Nếu chỉ làm được một việc thì làm việc này
2. **Tuần 2 — SAST và gitleaks.** Đặt ở chế độ **cảnh báo trước**, chuyển sang chặn merge sau khi đã dọn hết finding cũ. Nếu chặn ngay ngày đầu, cả team sẽ tìm cách tắt nó đi
3. **Tuần 3–4 — chốt license policy** thành file máy đọc được, và thêm script grep license header (khoảng 20 dòng, bắt được kha khá code AI copy nguyên khối)
4. **Gần bản giao lớn — dựng ORT** để sinh SBOM và NOTICE làm hạng mục giao hàng
5. **Chỉ khi legal cần web UI — mới thêm ScanCode.io**

Song song, đưa hai checklist vào `.bmad-core/checklists/` để agent chạy được qua task
`execute-checklist`, và thêm các item ở mục 3.8 vào `story-dod-checklist.md`.

**Nguyên tắc khi viết checklist:** mỗi item phải rơi vào một trong hai loại — tự động hóa
được thì đẩy vào CI, cần phán đoán của người thì mới giữ trong checklist. Một checklist 60
dòng mà nửa số dòng là việc máy làm được sẽ bị tick bừa sau hai sprint.

## 7. Việc đang tồn đọng

### 7.1 Đang chặn

1. Đọc MSA / SOW: điều khoản AI tools, IP ownership, indemnity, deliverable
2. Gửi techlead hai câu hỏi ở mục 7.2

### 7.2 Hai câu hỏi cần gửi techlead

> Deliverable cuối cùng của dự án là gì: mình vận hành hệ thống và khách chỉ truy cập, hay
> mình giao artifact (source code / Docker image / installer) để khách tự triển khai? Và
> khách có bao giờ nhận source code không?

> Dự án có ký BAA (Business Associate Agreement) với khách không? Hệ thống có lưu thông tin
> định danh bệnh nhân (PHI) không? Khách có gửi security questionnaire hoặc yêu cầu SOC 2 /
> HIPAA không?

Câu thứ hai có thể tự trả lời một phần bằng cách grep schema và migration tìm các cột
`patient`, `mrn`, `medical_record`, `dob`, `date_of_birth`, `ssn`, và kiểm tra xem đã có
bảng audit log chưa. Nếu đã có sẵn audit log thì gần như chắc chắn đã có yêu cầu compliance
từ trước.

### 7.3 Nhóm item IP bắt buộc thêm vì là dự án outsourcing

- [ ] Xác định policy license là của công ty hay của khách; nếu của khách thì xin xác nhận bằng email
- [ ] Kiểm tra điều khoản AI tools trong MSA / SOW trước khi tiếp tục dùng agent
- [ ] Đọc kỹ điều khoản indemnity để biết mức rủi ro công ty đang gánh, và báo lên quản lý nếu chưa ai nắm
- [ ] Carve-out cho background IP, để thư viện nội bộ không bị chuyển giao hết
- [ ] **Không tái sử dụng code chéo giữa các khách** — vi phạm phổ biến nhất trong outsourcing, và agent làm nó dễ xảy ra hơn vì context có thể chứa code của dự án khác
- [ ] SBOM và NOTICE là hạng mục giao hàng, đưa vào SOW
- [ ] Flow-down cho intern và freelancer: cùng ràng buộc IP và cùng AI policy
- [ ] Hồ sơ bàn giao khi kết thúc: source, doc, credential, và bộ hồ sơ compliance theo từng release
