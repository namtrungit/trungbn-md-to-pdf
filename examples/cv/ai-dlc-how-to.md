# Cách chạy AI-DLC trên dự án EDI Authority (MAX)

Quy trình lấy từ repo:

- Agent BMAD: `pm-services/pm-docs/.agents/skills/`
- Quy trình MAX: `pm-docs/docs/knowledge/Implementation/shared/process/max-development-process-ai-dlc.md`
- Cách dùng Cursor: `Cursor_Development_Process.md`
- Skill theo WI: `pm-services/.claude/skills/step_0` đến `step_4`

Ý chính: **AI viết bản nháp. Người đọc và duyệt trước khi sang bước tiếp theo.** AI không được tự merge code.

## Ai dùng agent nào

Mở Cursor trong `pm-docs` (hoặc repo có cài BMAD), rồi gọi đúng agent. Mỗi agent có menu. Chỉ chạy skill trong cột "Bắt buộc" cho một WI bình thường. Các skill còn lại là tùy chọn.

| Vai | Agent | Tên gọi | Skill bắt buộc | Skill tùy chọn |
| --- | --- | --- | --- | --- |
| **BA** | `bmad-agent-analyst` | **Mary** | `bmad-domain-research` nếu domain mới. `bmad-product-brief` để chốt yêu cầu. | `bmad-brainstorming`, `bmad-market-research`, `bmad-technical-research`, `bmad-prfaq`, `bmad-document-project` |
| **PM** (nếu cần tài liệu sản phẩm) | `bmad-agent-pm` | **John** | `bmad-prd`, rồi `bmad-create-epics-and-stories` | `bmad-check-implementation-readiness`, `bmad-correct-course` |
| **Architect** | `bmad-agent-architect` | **Winston** | `bmad-architecture` khi WI đổi kiến trúc. `bmad-check-implementation-readiness` trước khi Dev code. | — |
| **QC** | `bmad-tea` | **Murat** | `bmad-testarch-test-design` trước khi code. `bmad-testarch-atdd` để viết test fail trước. Sau khi có code: `bmad-testarch-trace` để quyết định cho qua hay không. | `bmad-testarch-automate`, `bmad-testarch-test-review`, `bmad-testarch-nfr`, `bmad-testarch-framework`, `bmad-testarch-ci` |
| **Dev** | `bmad-agent-dev` | **Amelia** | `bmad-create-story`, rồi `bmad-dev-story`. Song song với skill MAX ở mục dưới. | `bmad-quick-dev` cho việc nhỏ, `bmad-code-review`, `bmad-qa-generate-e2e-tests`, `bmad-sprint-planning`, `bmad-retrospective` |

Cách gọi trong chat:

```
Talk to Mary. Run bmad-domain-research for WI {số}.
```

```
Talk to Murat. Run bmad-testarch-test-design for WI {số}.
```

```
Talk to Amelia. Run bmad-dev-story for story {file story}.
```

## Các bước bắt buộc của một WI

Không nhảy bước. Design chưa duyệt thì chưa code. Test của QC được viết trước code.

### Trước khi Dev mở IDE

1. **BA — Mary.** Đọc yêu cầu. Nếu domain lạ, chạy `bmad-domain-research`. Chốt brief bằng `bmad-product-brief`. Kết quả là file BA (PDF hoặc Markdown) trong `tmp/{WI_NUMBER}/requirements/`.
2. **PM — John**, khi WI đủ lớn để cần PRD. Chạy `bmad-prd`, rồi `bmad-create-epics-and-stories`. WI nhỏ có thể bỏ bước này nếu BA spec đã đủ.
3. **Architect — Winston**, khi WI đụng kiến trúc hoặc nhiều module. Chạy `bmad-architecture`, rồi `bmad-check-implementation-readiness`. Người phải xác nhận PRD, kiến trúc và story khớp nhau.
4. **QC — Murat, trước code.** Chạy `bmad-testarch-test-design` (kế hoạch test theo rủi ro). Rồi `bmad-testarch-atdd` để sinh test đang fail. Dev chỉ được code khi các test này đã có.

### Dev chạy trên repo code

Mở `pm-services`, `pm-frontend`, hoặc `pm-transfers`. Dùng skill trong `.claude/skills/`. Amelia (`bmad-dev-story`) làm phần story. Các step dưới làm phần thiết kế và code của MAX.

| Bước | Skill | AI làm gì | Người làm gì | Cổng |
| --- | --- | --- | --- | --- |
| 0 | `step_0_high_level_solution.md` | Đọc BA, code, pm-docs. Viết giải pháp tối đa 25 dòng. Chỉ file BE và FE sẽ sửa. | Chấp nhận hướng làm. | Chưa duyệt thì không sang Step 1. |
| 0.5 | `step_0_5_internal_estimate.md` | Viết estimate nội bộ. | Kiểm tra estimate. | Cần Step 0 đã duyệt. |
| 1 | `step_1_design.md` | Viết hoặc sửa SAD, detailed design, database design, how-to. Tự đối chiếu checklist. | Mob: trả lời câu hỏi của AI, chốt quyết định nghiệp vụ. | Lưu vào pm-docs. |
| 2 | `step_2_review_design.md` | Review đúng nghiệp vụ và kiến trúc. Không sửa ngữ pháp. | Senior duyệt. | Không đạt thì quay lại Step 1. |
| 3 | `step_3_implementation.md` | Test trước, rồi code theo lớp: Domain → Application → Infrastructure → Presentation. Chạy test đến khi pass. | Làm đúng repo. Không nhận code nếu test fail hoặc lệch design đã duyệt. | Coverage domain/application mục tiêu trên 80%. |
| 4 | `step_4_wi_code_review.md` | Review chất lượng, kiến trúc, test, lỗi, bảo mật, hiệu năng. Không review lại yêu cầu nghiệp vụ (việc đó là Step 2). | Hai developer approve. | Chưa đủ 2 approval thì không merge. |

Prompt mẫu:

```
Làm Step 1 cho WI {số WI}: {tên WI}.
Đọc skill .claude/skills/step_1_design.md.
BA nằm ở tmp/{WI_NUMBER}/requirements/ba-requirement.md.
Đọc design liên quan trong pm-docs. Chưa code.
```

Đổi số step và tên file skill cho các bước còn lại.

### Sau khi có code

5. **QC — Murat.** Chạy `bmad-testarch-test-review` nếu cần soi chất lượng test. Chạy `bmad-testarch-trace` để map yêu cầu sang test và ra quyết định gate.
6. **Merge.** Chỉ merge khi Step 2 đã duyệt, Step 4 có hai người approve, và gate của Murat không chặn.

## Thư mục mỗi WI

```
tmp/{WI_NUMBER}/
  requirements/     BA requirement, đã chuyển từ PDF sang Markdown
  design/           SAD, detailed design, database design
  checklist/        checklist review
```

## Chuẩn bị Cursor một lần

1. Mở đúng repo.
2. Bật **Do not use data for training**.
3. Bật Claude skills, trỏ tới `.claude/skills/`.
4. Đọc được `pm-docs` qua MCP hoặc folder cạnh repo.

Model gợi ý trong tài liệu Cursor của team: Step 1 và Step 2 dùng model giỏi suy luận. Step 3 dùng model sửa nhiều file. Step 4 dùng model cân bằng cho review.

## Ba pha trong tài liệu AI-DLC

1. **Inception:** bước BA, PM, Architect, QC test design, và Step 0 đến Step 2.
2. **Construction:** ATDD, Step 3, Step 4. Test viết trước code.
3. **Operations:** build và deploy staging. Người kiểm tra staging trước production.

## Không nhầm với pipeline tự động

`MAX_How_To_AI_Dev_Pipeline_1_0.md` mô tả pipeline Claude Code CLI + LangGraph + FastAPI. Đó là tài liệu xây pipeline. Cách chạy hàng ngày là gọi Mary, Murat, Amelia và các step skill trong Cursor, rồi người duyệt ở mỗi cổng.
