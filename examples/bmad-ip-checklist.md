---
title: Checklist Intellectual Property cho dự án BMad/SDD
---

# Checklist Intellectual Property

Tài liệu chuẩn bị cho việc áp dụng BMad + SDD vào quy trình sản xuất phần mềm.
Phạm vi: dự án outsourcing, stack Golang / React-Vite-TypeScript / Ruby on Rails,
code được sinh một phần bằng AI agent.

Trạng thái: **review**

## 1. Quyền và hợp đồng

- [ ] MSA / SOW có điều khoản nào về AI coding assistant? Cấm, hay yêu cầu khai báo?
- [ ] Nếu cần chấp thuận: đã có văn bản khách đồng ý, kèm danh sách tool cụ thể
- [ ] Ai sở hữu work product — được ghi thành câu trong SOW, không để mặc định
- [ ] Legal xác nhận: ở một số nước, tác phẩm do AI sinh thuần túy có thể không được bảo hộ bản quyền
- [ ] Nhân sự, kể cả intern và freelancer, đã ký IP assignment và AI usage policy
- [ ] Có allowlist các tool AI được duyệt; muốn thêm tool phải xin duyệt

## 2. Chống rò rỉ IP và dữ liệu qua model

- [ ] Cursor bật Privacy Mode / zero data retention, có bằng chứng bằng văn bản
- [ ] Legal đã review terms và DPA của model provider; kiểm tra data residency nếu khách yêu cầu
- [ ] `.cursorignore` loại trừ secret, config production, dữ liệu khách khỏi phạm vi index
- [ ] **Không đưa dữ liệu thật vào prompt.** Nếu là PHI, việc gửi cho model provider có thể cần chính provider nằm trong phạm vi BAA — điều mà terms tiêu chuẩn không đáp ứng. Đây là ranh giới pháp lý cứng, không phải best practice
- [ ] Tách workspace theo từng khách; code của khách A không xuất hiện trong context khi làm cho khách B

## 3. Provenance của code do AI sinh ra

- [ ] Grep diff tìm dấu hiệu code sao chép: `Copyright`, `SPDX-License-Identifier`, `Licensed under`, `GPL`, `@license`
- [ ] Khối code liền mạch từ khoảng 20–50 dòng trở lên trùng khớp một project OSS thì phải điều tra: viết lại, tuân thủ license, hoặc xin exception
- [ ] Cấm copy trực tiếp từ Stack Overflow — nội dung ở đó là CC BY-SA, tức có nghĩa vụ ghi công và share-alike, xung đột với sản phẩm closed-source
- [ ] Mỗi commit có một con người chịu trách nhiệm (`Reviewed-by`); không merge commit do bot tạo mà chưa ai duyệt
- [ ] Lưu vết truy xuất story ID → spec / prompt → file, tận dụng `Dev Agent Record` và `File List` của BMad

## 4. License của dependency

- [ ] Có license policy ở dạng máy đọc được (nội dung ở mục 7)
- [ ] Scan cả transitive dependency, không chỉ direct — phần lớn rủi ro nằm ở tầng sâu
- [ ] **Chống hallucinated và typosquat package.** Agent thường đề xuất thư viện không tồn tại hoặc tên gần giống thư viện thật, và kẻ tấn công đã đăng ký sẵn những tên đó. Mỗi dependency mới phải kiểm repo gốc, số download, ngày publish đầu tiên, maintainer
- [ ] Lockfile được commit; CI cài bằng `--frozen-lockfile` hoặc `bundle install --deployment`
- [ ] Cảnh giác các package thương mại mà agent hay tự cài: **AG Grid Enterprise, Highcharts, FullCalendar Premium, FontAwesome Pro, Syncfusion**. Chúng cài được không cần key nhưng dùng trong sản phẩm thương mại là vi phạm license

## 5. Asset không phải code

- [ ] Font, icon, ảnh, video, âm thanh có license cho mục đích thương mại. Ví dụ cụ thể: **Calibri là font độc quyền của Microsoft, không được embed vào sản phẩm phân phối**; dùng Carlito nếu cần metric tương đương
- [ ] Dataset dùng để test hoặc train có license phù hợp
- [ ] Nội dung do AI sinh (text, hình ảnh) cũng có rủi ro trùng tác phẩm có bản quyền
- [ ] Trademark: tên sản phẩm và module không trùng nhãn hiệu đã đăng ký

## 6. Bằng chứng và lưu trữ

- [ ] Mỗi release lưu đủ bộ: SBOM, báo cáo license scan, registry exception đã duyệt
- [ ] Thời hạn lưu tối thiểu bằng thời hạn hợp đồng — đây là hồ sơ khách đòi khi audit
- [ ] Có playbook xử lý khi phát hiện vi phạm: ai quyết định, trong bao lâu, có phải thông báo khách không

## 7. License policy

Dùng giả định nghiêm ngặt, tức coi như có phân phối.

| Nhóm | Danh sách |
| --- | --- |
| **Cho phép** | MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause, ISC, Zlib, Unlicense, MPL-2.0 |
| **Chặn** | GPL-2.0, GPL-3.0, AGPL-3.0, **LGPL mọi phiên bản**, SSPL, BUSL, CC BY-NC, CC BY-SA, và **unknown / no license** |
| **Review từng ca** | Các package thương mại (xem mục 4) |

Lý do LGPL bị chặn thẳng thay vì để ở nhóm cần review: Go link tĩnh dependency vào
binary, và Vite bundle toàn bộ dependency vào file JS gửi cho browser. Cả hai đều làm
mất cơ chế dynamic linking mà LGPL dựa vào để giới hạn phạm vi copyleft.

Bảng này không nên chỉ nằm trong tài liệu. Nó khai được thành file `policies.yml`,
mỗi license một `compliance_alert` ở mức `error` cho nhóm chặn và `warning` cho nhóm
review, để policy được thi hành bằng máy khi release.

Ghi chú về mô hình phân phối, để khi biết câu trả lời thì điều chỉnh policy:

- **Khách tự vận hành, mình giao artifact** (source, Docker image, installer, hoặc chỉ một file `docker-compose.yml` kèm image) — đây **là** distribution. GPL và LGPL kích hoạt đầy đủ
- **Mình hoặc khách host, người dùng truy cập qua web** — GPL phần lớn không kích hoạt, **nhưng AGPL-3.0 thì có**: chỉ cần cho người dùng truy cập qua network là đã phát sinh nghĩa vụ cung cấp source. SSPL còn nặng hơn

<!-- pagebreak -->

## 8. Thuật ngữ viết tắt

Chỉ gồm các từ có xuất hiện trong tài liệu này.

### 8.1 Quy trình và kỹ thuật

| Viết tắt | Tên đầy đủ | Nghĩa trong tài liệu này |
| --- | --- | --- |
| AI | Artificial Intelligence | Công cụ sinh code; mọi work product vẫn phải có người chịu trách nhiệm |
| BMad | Breakthrough Method of Agile AI-Driven Development | Framework agile dùng agent AI, chia theo phase và checklist |
| CI | Continuous Integration | Nơi thi hành license policy khi cài dependency từ lockfile |
| OSS | Open Source Software | Phần mềm nguồn mở; khối code trùng OSS phải điều tra license |
| SBOM | Software Bill of Materials | Danh mục toàn bộ thành phần trong một bản build, lưu theo từng release |
| SDD | Spec-Driven Development | Lấy spec làm nguồn chân lý để agent sinh code |
| SPDX | Software Package Data Exchange | Chuẩn định danh license; header `SPDX-License-Identifier` là dấu vết copy |

### 8.2 Hợp đồng và pháp lý

| Viết tắt | Tên đầy đủ | Nghĩa trong tài liệu này |
| --- | --- | --- |
| BAA | Business Associate Agreement | Hợp đồng theo HIPAA, bắt buộc khi bên thứ ba xử lý PHI |
| DPA | Data Processing Agreement | Hợp đồng xử lý dữ liệu với model provider |
| IP | Intellectual Property | Quyền sở hữu trí tuệ, chủ đề của checklist này |
| MSA | Master Service Agreement | Hợp đồng khung với khách |
| PHI | Protected Health Information | Dữ liệu sức khỏe được pháp luật bảo vệ; không được đưa vào prompt |
| SOW | Statement of Work | Phụ lục mô tả phạm vi, nơi ghi ai sở hữu work product |

### 8.3 License

| Viết tắt | Tên đầy đủ | Nhóm (mục 7) |
| --- | --- | --- |
| AGPL | Affero General Public License | Chặn; kích hoạt cả khi chỉ cho truy cập qua network |
| Apache-2.0 | Apache License 2.0 | Cho phép |
| BSD | Berkeley Software Distribution License | Cho phép, bản 2-Clause và 3-Clause |
| BUSL | Business Source License | Chặn; chỉ thành nguồn mở sau một thời hạn |
| CC BY-NC | Creative Commons Attribution-NonCommercial | Chặn; cấm dùng thương mại |
| CC BY-SA | Creative Commons Attribution-ShareAlike | Chặn; có share-alike, là license của Stack Overflow |
| copyleft | — | Điều khoản buộc bản phái sinh cùng license; gốc của rủi ro GPL |
| GPL | GNU General Public License | Chặn |
| ISC | Internet Systems Consortium License | Cho phép |
| LGPL | Lesser General Public License | Chặn; Go link tĩnh và Vite bundle làm mất dynamic linking |
| MIT | MIT License | Cho phép |
| MPL-2.0 | Mozilla Public License 2.0 | Cho phép; copyleft giới hạn trong từng file |
| SSPL | Server Side Public License | Chặn; nặng hơn cả AGPL |
