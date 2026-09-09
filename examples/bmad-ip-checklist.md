---
title: Checklist Intellectual Property cho dự án BMad/SDD
---

# Checklist Intellectual Property

Tài liệu chuẩn bị cho việc áp dụng BMad + SDD vào quy trình sản xuất phần mềm.
Phạm vi: dự án outsourcing, stack Golang / React-Vite-TypeScript / Ruby on Rails,
code được sinh một phần bằng AI agent.

Trạng thái: **review**

## 1. Chống rò rỉ IP và dữ liệu qua model

- [ ] Cursor bật Privacy Mode / zero data retention, có bằng chứng bằng văn bản
- [ ] Legal đã review terms và DPA của model provider; kiểm tra data residency nếu khách yêu cầu
- [ ] `.cursorignore` loại trừ secret, config production, dữ liệu khách khỏi phạm vi index
- [ ] **Không đưa dữ liệu thật vào prompt.** Nếu là PHI, việc gửi cho model provider có thể cần chính provider nằm trong phạm vi BAA — điều mà terms tiêu chuẩn không đáp ứng. Đây là ranh giới pháp lý cứng, không phải best practice
- [ ] Tách workspace theo từng khách; code của khách A không xuất hiện trong context khi làm cho khách B

## 2. Provenance của code do AI sinh ra

- [ ] Grep diff tìm dấu hiệu code sao chép: `Copyright`, `SPDX-License-Identifier`, `Licensed under`, `GPL`, `@license`
- [ ] Khối code liền mạch từ khoảng 20–50 dòng trở lên trùng khớp một project OSS thì phải điều tra: viết lại, tuân thủ license, hoặc xin exception
- [ ] Cấm copy trực tiếp từ Stack Overflow — nội dung ở đó là CC BY-SA, tức có nghĩa vụ ghi công và share-alike, xung đột với sản phẩm closed-source
- [ ] Mỗi commit có một con người chịu trách nhiệm (`Reviewed-by`); không merge commit do bot tạo mà chưa ai duyệt
- [ ] Lưu vết truy xuất story ID → spec / prompt → file, tận dụng `Dev Agent Record` và `File List` của BMad

## 3. License của dependency

- [ ] Có license policy ở dạng máy đọc được (nội dung ở mục 6)
- [ ] Scan cả transitive dependency, không chỉ direct — phần lớn rủi ro nằm ở tầng sâu
- [ ] **Chống hallucinated và typosquat package.** Agent thường đề xuất thư viện không tồn tại hoặc tên gần giống thư viện thật, và kẻ tấn công đã đăng ký sẵn những tên đó. Mỗi dependency mới phải kiểm repo gốc, số download, ngày publish đầu tiên, maintainer
- [ ] Lockfile được commit; CI cài bằng `--frozen-lockfile` hoặc `bundle install --deployment`
- [ ] Cảnh giác các package thương mại mà agent hay tự cài: **AG Grid Enterprise, Highcharts, FullCalendar Premium, FontAwesome Pro, Syncfusion**. Chúng cài được không cần key nhưng dùng trong sản phẩm thương mại là vi phạm license

## 4. Asset không phải code

- [ ] Font, icon, ảnh, video, âm thanh có license cho mục đích thương mại. Ví dụ cụ thể: **Calibri là font độc quyền của Microsoft, không được embed vào sản phẩm phân phối**; dùng Carlito nếu cần metric tương đương
- [ ] Dataset dùng để test hoặc train có license phù hợp
- [ ] Nội dung do AI sinh (text, hình ảnh) cũng có rủi ro trùng tác phẩm có bản quyền
- [ ] Trademark: tên sản phẩm và module không trùng nhãn hiệu đã đăng ký

## 5. Bằng chứng và lưu trữ

- [ ] Mỗi release lưu đủ bộ: SBOM, báo cáo license scan, file NOTICE, registry exception đã duyệt
- [ ] Thời hạn lưu tối thiểu bằng thời hạn hợp đồng — đây là hồ sơ khách đòi khi audit
- [ ] Có playbook xử lý khi phát hiện vi phạm: ai quyết định, trong bao lâu, có phải thông báo khách không

## 6. License policy

Dùng giả định nghiêm ngặt, tức coi như có phân phối. Bảng này là đầu vào `policies.yml` của ScanCode.io (mục 7).

| Nhóm | Danh sách |
| --- | --- |
| **Cho phép** | MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause, ISC, Zlib, Unlicense, MPL-2.0 |
| **Chặn** | GPL-2.0, GPL-3.0, AGPL-3.0, **LGPL mọi phiên bản**, SSPL, BUSL, CC BY-NC, CC BY-SA, và **unknown / no license** |
| **Review từng ca** | Các package thương mại (xem mục 3) |

Lý do LGPL bị chặn thẳng thay vì để ở nhóm cần review: Go link tĩnh dependency vào
binary, và Vite bundle toàn bộ dependency vào file JS gửi cho browser. Cả hai đều làm
mất cơ chế dynamic linking mà LGPL dựa vào để giới hạn phạm vi copyleft.

Ghi chú về mô hình phân phối, để khi biết câu trả lời thì điều chỉnh policy:

- **Khách tự vận hành, mình giao artifact** (source, Docker image, installer, hoặc chỉ một file `docker-compose.yml` kèm image) — đây **là** distribution. GPL và LGPL kích hoạt đầy đủ
- **Mình hoặc khách host, người dùng truy cập qua web** — GPL phần lớn không kích hoạt, **nhưng AGPL-3.0 thì có**: chỉ cần cho người dùng truy cập qua network là đã phát sinh nghĩa vụ cung cấp source. SSPL còn nặng hơn

<!-- pagebreak -->

## 7. Áp dụng ScanCode.io

ScanCode.io (AboutCode, Apache-2.0) là cổng **release**: quét license và copyright **mức file**,
chạy policy, xuất SBOM và file NOTICE. Không đặt trên mọi PR — tool đọc và so khớp text
từng file nên chậm (phút đến giờ; có `node_modules` / `vendor` / monorepo thì hàng giờ).

Hai lớp hay gặp:

- **ScanCode Toolkit** — CLI quét nội dung từng file: license text, license header, dòng copyright, package metadata. Đây là lớp bắt được rủi ro của code AI sinh: file copy nguyên khối kéo theo header GPL/AGPL.
- **ScanCode.io** — ứng dụng trên Toolkit (Docker + Postgres + web UI): pipeline, policy engine (`policies.yml`), xuất NOTICE / attribution, SBOM file-level.

Điểm yếu đã chấp nhận: ScanCode **không** thay snippet matching thương mại. Bù bằng grep header
ở mục 2 trên từng PR, PR nhỏ, và chốt allowlist ở mục 6 trước khi thư viện vào codebase.

### 7.1 Dựng hạ tầng

- [ ] Dựng ScanCode.io bằng Docker + Postgres khi gần release
- [ ] Legal / techlead vào được web UI để xem finding, không phụ thuộc Dev xuất file tay
- [ ] Repo có file `policies.yml` map đúng bảng mục 6: `compliance_alert: error` cho nhóm chặn, `warning` cho nhóm review từng ca

### 7.2 Mỗi lần release

- [ ] Tạo project / pipeline trên ScanCode.io cho đúng tag hoặc artifact sẽ giao
- [ ] Quét source có chủ đích: **loại** `node_modules`, `vendor`, cache build khỏi path nặng; vẫn phải cover lockfile và code mình viết (kể cả code agent sinh)
- [ ] Không còn finding `error` trước khi đóng gói — GPL, AGPL, LGPL, SSPL, BUSL, CC BY-NC, CC BY-SA, unknown / no license
- [ ] Finding `warning` (package thương mại, dual-license, license lạ) đã có người duyệt, lý do, ngày hết hạn, ghi vào registry exception
- [ ] Xuất **SBOM** định dạng CycloneDX hoặc SPDX
- [ ] Xuất **NOTICE / THIRD-PARTY-LICENSES** — đây là lý do dựng ScanCode.io chứ không chỉ quét metadata package. Lệnh tham chiếu: `scanpipe output --format attribution`
- [ ] Đóng gói hồ sơ: SBOM, NOTICE, báo cáo scan, registry exception (người duyệt, lý do, hạn)
- [ ] Lưu trữ theo thời hạn hợp đồng, thường 3 đến 7 năm. SBOM và NOTICE nên là **hạng mục release trong SOW**

### 7.3 Checklist vận hành ScanCode.io

- [ ] Policy trên server trùng với mục 6; đổi allowlist thì cập nhật `policies.yml` cùng lúc
- [ ] Header `Copyright`, `SPDX-License-Identifier`, `Licensed under`, `GPL`, `@license` trong file mới đã được giải quyết (viết lại, tuân thủ, hoặc exception)
- [ ] Không cam kết với khách rằng ScanCode.io phát hiện được copy snippet không kèm license header — phạm vi đó phải giới hạn trong SOW hoặc là hạng mục audit riêng

<!-- pagebreak -->

## 8. Thuật ngữ viết tắt

Chỉ gồm các từ có xuất hiện trong tài liệu này.

### 8.1 Quy trình và kỹ thuật

| Viết tắt | Tên đầy đủ | Nghĩa trong tài liệu này |
| --- | --- | --- |
| AI | Artificial Intelligence | Công cụ sinh code; mọi work product vẫn phải có người chịu trách nhiệm |
| BMad | Breakthrough Method of Agile AI-Driven Development | Framework agile dùng agent AI, chia theo phase và checklist |
| CI | Continuous Integration | Nơi cài dependency từ lockfile; không phải nơi chạy ScanCode.io |
| OSS | Open Source Software | Phần mềm nguồn mở; khối code trùng OSS phải điều tra license |
| SBOM | Software Bill of Materials | Danh mục toàn bộ thành phần trong một bản build |
| SDD | Spec-Driven Development | Lấy spec làm nguồn chân lý để agent sinh code |
| SPDX | Software Package Data Exchange | Chuẩn định danh license, và một định dạng SBOM |
| UI | User Interface | Web UI của ScanCode.io để legal tự xem kết quả |

### 8.2 Hợp đồng và pháp lý

| Viết tắt | Tên đầy đủ | Nghĩa trong tài liệu này |
| --- | --- | --- |
| BAA | Business Associate Agreement | Hợp đồng theo HIPAA, bắt buộc khi bên thứ ba xử lý PHI |
| DPA | Data Processing Agreement | Hợp đồng xử lý dữ liệu với model provider |
| IP | Intellectual Property | Quyền sở hữu trí tuệ, chủ đề của checklist này |
| NOTICE | — | File liệt kê license bên thứ ba; nghĩa vụ của MIT, Apache-2.0, BSD |
| PHI | Protected Health Information | Dữ liệu sức khỏe được pháp luật bảo vệ; không được đưa vào prompt |
| SOW | Statement of Work | Phụ lục mô tả phạm vi; SBOM và NOTICE nên là hạng mục release |

### 8.3 License

| Viết tắt | Tên đầy đủ | Nhóm (mục 6) |
| --- | --- | --- |
| AGPL | Affero General Public License | Chặn; kích hoạt cả khi chỉ cho truy cập qua network |
| Apache-2.0 | Apache License 2.0 | Cho phép |
| BSD | Berkeley Software Distribution License | Cho phép, bản 2-Clause và 3-Clause |
| BUSL | Business Source License | Chặn; chỉ thành nguồn mở sau một thời hạn |
| CC BY-NC | Creative Commons Attribution-NonCommercial | Chặn; cấm dùng thương mại |
| CC BY-SA | Creative Commons Attribution-ShareAlike | Chặn; có share-alike, là license của Stack Overflow |
| copyleft | — | Điều khoản buộc bản phái sinh cùng license; gốc của rủi ro GPL |
| CycloneDX | — | Một định dạng SBOM; ScanCode.io xuất được |
| GPL | GNU General Public License | Chặn |
| ISC | Internet Systems Consortium License | Cho phép |
| LGPL | Lesser General Public License | Chặn; Go link tĩnh và Vite bundle làm mất dynamic linking |
| MIT | MIT License | Cho phép |
| MPL-2.0 | Mozilla Public License 2.0 | Cho phép; copyleft giới hạn trong từng file |
| SSPL | Server Side Public License | Chặn; nặng hơn cả AGPL |
