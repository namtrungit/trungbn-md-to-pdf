# AI_CONTEXT — Dự án Research "Analog + Polaroid Photo Room" (TP.HCM)

> File này là **bộ nhớ chuyển giao (handoff)**. Mọi dữ liệu research đã thu thập đều nằm ở đây.
> Session sau đọc file này là có thể viết tiếp báo cáo **mà không cần search lại**.
>
> - Ngày research: **27/09/2026** (mọi mốc giá dùng ngày này làm "ngày kiểm tra")
> - Trạng thái: research **XONG**, tính toán **XONG**, viết báo cáo **XONG** (20/20 phần) — xuất .md + .pdf **XONG**

## ✅ TRẠNG THÁI BÀN GIAO (cập nhật 27/09/2026)

Báo cáo đã hoàn tất và đã xuất file:

| File | Kích thước |
|---|---|
| `reports/analog-polaroid-photo-room-market-research-2026.md` | 208 KB · 2.321 dòng |
| `reports/analog-polaroid-photo-room-market-research-2026.pdf` | 3,5 MB · **125 trang A4** |

**Đã viết đủ 20 phần + phần KẾT "10 insight quan trọng nhất" + Phụ lục nguồn (57 nguồn) + danh sách "không tìm thấy dữ liệu công khai".**

**Lỗi đã gặp khi xuất PDF (lần sau gặp lại thì xử lý ngay):** Puppeteer không tìm thấy Chromium (cache path trỏ vào thư mục sandbox tạm). Khắc phục bằng cách dùng Chrome hệ thống — lệnh đầy đủ ở §8.

**Nếu cần sửa & xuất lại:** chỉ cần sửa file `.md` rồi chạy lại lệnh ở §8 (có 2 dòng `export`). Không cần gộp file nữa.

---

---

## 1. YÊU CẦU CỦA USER (nguyên bản, rút gọn)

Đóng vai **Senior Consultant** (Photography/Analog & Instant, Photobooth & experiential business, Consumer behavior, Branding & Marketing, Digital/Social, Market Research Việt Nam).

**Bối cảnh team:** Team đang nghiên cứu business concept ANALOG CAMERA + POLAROID/INSTANT CAMERA, có thể phát triển thành "analog/Polaroid photo room / photobooth experience". Kênh Instagram dự kiến tập trung analog + Polaroid. Team đang nghĩ về "phòng chụp Polaroid cổ". Team cho rằng analog và Polaroid khác công nghệ nhưng tạo cùng cảm giác: nostalgia, physical memory, imperfect/unique images. Team muốn biết tiềm năng, điểm mạnh, và tại VN đã có ai làm tốt chưa. "PTB" = photobooth.

**Deliverable:** 1 báo cáo **20 phần** (cấu trúc ở §7 file này), viết **tiếng Việt**, có bảng, có citation cạnh claim quan trọng, xuất **file .md + .pdf** trong project `/Users/trungbn/trungbn_working_space/md-to-pdf`.

**Yêu cầu nghiên cứu (bắt buộc tuân thủ khi viết):**
- Phải SEARCH WEB trước khi nêu số liệu (đã làm xong — data ở §3–§5).
- Ưu tiên nguồn chính thức brand / IG-TikTok chính thức / website / báo uy tín / market report.
- Giá phải ghi **ngày kiểm tra**.
- Phân biệt rõ 4 loại: **Fact / Source-reported claim / Your analysis / Assumption**.
- KHÔNG bịa số. Không có dữ liệu thì ghi **"không tìm thấy dữ liệu công khai"** hoặc **"không công khai"**.
- Ưu tiên data VN 2025–2026; dùng data quốc tế phải nói rõ là quốc tế.
- **Chủ động tìm evidence cho khả năng concept THẤT BẠI**, không chỉ tìm nguồn ủng hộ.
- Chỉ rõ assumption nào cần test bằng MVP.
- Business model: trình bày **từng option**, không tự quyết.
- Positioning: **KHÔNG chọn 1 hướng thay team**, phải phân tích trade-off.
- USP: phân biệt Feature / Benefit / Emotional benefit / True USP. Không gọi feature thường là USP.
- Decision matrix: **không chấm điểm kiểu "AI cho rằng cái này tốt nhất"**, chỉ đưa data/assumption để team tự đánh giá.
- Kết bài: **"10 insight quan trọng nhất mà team cần mang vào buổi meeting"**.

**Output style:** không lan man, nhưng đủ sâu để làm nền cho marketing/business plan.

### Quy ước nhãn nguồn dùng trong báo cáo
| Nhãn | Nghĩa |
|---|---|
| `[F]` | Fact — số liệu/dữ kiện kiểm chứng được từ nguồn |
| `[S]` | Source-reported claim — nguồn (thường là doanh nghiệp/báo) tự nêu, chưa kiểm chứng độc lập |
| `[A]` | Analysis — phân tích/suy luận của consultant |
| `[G]` | Giả định (Assumption) — cần test, phải ghi rõ |

---

## 2. KẾT LUẬN CHIẾN LƯỢC ĐÃ CHỐT (viết báo cáo phải giữ đúng các luận điểm này)

### 2.1. Insight trung tâm — "Nghịch lý giá sàn của Polaroid"
Film Polaroid i-Type giá **~65.000đ/tấm** (fact, xem §4.2). Một phòng chụp Polaroid thật 4 tấm có COGS film **260.000đ**. Để giữ gross margin 65% thì **giá bán phải ~740.000đ/lượt**.

Trong khi đó giá photobooth phổ biến tại VN là **70.000–150.000đ/lượt** (fact, §3.2).

→ **[A] Mô hình "phòng chụp Polaroid thật" KHÔNG THỂ cạnh tranh trong khung giá photobooth. Nó buộc phải là sản phẩm premium 500k–900k, tức là đổi hẳn sân đấu**: không đấu với Photoism/Life4cuts, mà đấu với self-photo studio premium kiểu Oddity Mode Hàn Quốc (~800k–1,1tr VND) và Saigon Film Photowalk (550k–1,15tr). Đây là kết luận quan trọng nhất của cả bài.

### 2.2. Insight trung tâm — "Analog và Polaroid KHÁC NHAU về chu kỳ tiền, không chỉ khác công nghệ"
- **Analog 35mm**: rẻ (~8.500–11.000đ/frame all-in) nhưng **khách phải chờ 2–5 ngày** mới có ảnh → không tương thích với retail walk-in cần instant gratification.
- **Instant (Polaroid/Instax)**: đắt (19.000–67.000đ/tấm) nhưng **ảnh ra tay trong 1–15 phút** → đúng chuẩn retail.

→ **[A] Trả lời câu hỏi của team "có hợp lý khi đặt analog + Polaroid dưới cùng 1 brand?":**
**CÓ ở tầng brand/category** (cùng bán nostalgia + physical memory + imperfection), **KHÔNG ở tầng 1 SKU/1 quy trình vận hành**. Analog nên bán dạng **workshop / photowalk / membership / event** (slow product, thu tiền trước, giao sau). Instant nên bán dạng **room/booth** (fast product). Hai dòng tiền, hai cách vận hành khác nhau, dùng chung một thương hiệu.

### 2.3. Evidence cho khả năng THẤT BẠI (bắt buộc đưa vào §15 Risks và §1 Exec Summary)
1. **Hàn Quốc — bằng chứng mạnh nhất**: doanh thu ngành tăng **2,4 lần** (1.344 → 3.196 tỷ won, 2020→2024) nhưng **số vụ đóng cửa tăng 3,5 lần** (176 → 611 ca). Thị trường lớn lên ≠ từng cửa hàng sống được. (Nguồn: Cục Thuế Quốc gia HQ qua Seoul Economic Daily 17/02/2026.)
2. **Mật độ VN đã cao**: 490 photo booth toàn quốc (poidata.io, 7/2026); aggregator reviewphotobooth.com ghi **243 điểm / 118 thương hiệu**; Photoism 54 điểm chỉ riêng TP.HCM.
3. **Hòa vốn cần ~10.000 lượt chụp** nếu đầu tư 700tr–1 tỷ (haisanongba.com dẫn lời chủ quán).
4. **Goodgood (10/2025)**: thị trường Hà Nội "đã qua giai đoạn miền Tây hoang dã", startup copy mờ nhạt "cầm chắc thất bại".
5. **Nhật Bản — cảnh báo dài hạn**: purikura từ đỉnh 50.000 máy (1997) còn ~10.000 máy; thị trường co còn ~1/5 đỉnh; Furyu FY2026 lượt chơi giảm 29,57tr → 27,87tr.
6. **Trend fatigue**: chính các chủ tiệm VN thừa nhận photobooth "mang đậm yếu tố xu hướng" (VTV Money).

### 2.4. White space đã tìm được (mỗi gap phải kèm evidence, không suy đoán)
| # | Gap | Evidence |
|---|---|---|
| 1 | **Chưa có "true instant/chemical photo room"** — cả thị trường đang dùng máy ảnh số + máy in nhiệt rồi *giả lập* vẻ film | Fuji Studio bán concept "retro" bằng hiệu ứng AI/film filter; Lidi "retro cinema"; MonoBooth "vintage" nhưng là ảnh số; Ngói mới "in ảnh dạng âm bản phim" (in mô phỏng). Search 27/09/2026 **không tìm thấy** cơ sở VN nào chụp bằng film/Polaroid thật trong mô hình phòng chụp. *Lưu ý phải ghi: absence of evidence ≠ absence in market, cần field-check.* |
| 2 | **Analog community đã có nhưng bị cắt rời khỏi trải nghiệm bán lẻ** | Đã có lab (LLAB, Croplab, Noirfoto), retail (Analog House), workshop (Fox Spirit 480–580k, LacaSoak darkroom 770k), tour (Saigon Film Photowalk 550k–1,15tr) — nhưng nằm rải rác, không có brand nào hợp nhất thành một "nhà" cho analog. |
| 3 | **Phân khúc giá 250k–900k gần như trống** | Photobooth kẹt ở 70–150k; studio nghệ thuật nhảy lên 1–6tr. Khoảng giữa hầu như không có người chơi (trừ tour photowalk). |
| 4 | **Tệp khách quốc tế chưa được khai thác bằng mô hình phòng chụp** | TP.HCM 8T/2026 đón **7,77 triệu khách quốc tế (+38,5%)**; Saigon Film Photowalk chứng minh khách Tây trả 145–148 USD cho trải nghiệm analog; nhưng các photobooth đang nhắm gần như 100% Gen Z nội địa. |
| 5 | **Không ai bán "nghi thức chờ đợi" như một sản phẩm** | Khách VN đã chờ 4–8 tiếng để chụp photobooth (Kenh14) → chứng minh chờ đợi không phải deal-breaker mà có thể biến thành giá trị. Chưa brand nào thiết kế trải nghiệm quanh việc chờ tráng film. |

---

## 3. DATA THỊ TRƯỜNG VIỆT NAM (đã verify, ngày kiểm tra 27/09/2026)

### 3.1. Quy mô & mật độ
| Chỉ số | Giá trị | Nguồn | Nhãn |
|---|---|---|---|
| Số photo booth toàn VN | **490** (7/2026) | poidata.io/report/photo-booth/vietnam | [S] |
| Tập trung cao nhất | Thủ Đức 21 (4,3%), Thanh Hóa 12, Tây Hồ 11, Nha Trang 11, Đống Đa 11 | poidata.io | [S] |
| Aggregator VN | **243 photobooth / 118 thương hiệu / 482 review** | reviewphotobooth.com | [S] |
| Thị trường photobooth toàn cầu | 584,7 triệu USD (2025) → **1,43 tỷ USD (2035)**, CAGR 9,3% | Future Market Insights, dẫn qua VTV Money + hlgame.vn | [S] |
| Giai đoạn "nóng" tại VN | chỉ 1–2 năm trở lại đây | VTV Money 07/04/2026 | [S] |

### 3.2. Giá dịch vụ (BENCHMARK GIÁ — ngày kiểm tra 27/09/2026)
| Loại | Giá | Nguồn |
|---|---|---|
| Phổ biến toàn quốc / lượt | **70.000–150.000đ** | VTV Money 07/04/2026; Kenh14; Boothsummer |
| Photoism (giữ giá từ ngày đầu) | **70.000–100.000đ**/lượt; frame idol **150.000đ** | CafeF 04/10/2025, phỏng vấn GM Photoism VN |
| Razzle Dazzle (TTTM Hà Nội) | 80.000đ/lượt | Goodgood 10/2025 |
| Life4Cut | 70.000–80.000đ/lượt | Goodgood 10/2025 |
| MonoClick (ngách, giá cao hơn) | 80.000–100.000đ/lượt | Goodgood 10/2025 |
| Life4cuts Vincom Thủ Đức | 85.000–165.000đ (4–6 ảnh) | thelandmark81.com.vn |
| Photo Won (Thủ Đức) | 75.000–155.000đ (4–6 ảnh) | thelandmark81.com.vn |
| Mononow (125 Hai Bà Trưng) | 100.000đ flat/lượt | vietnamtour247.com |
| Quận 1 nói chung | 60.000–100.000đ/lượt, 4–6 ảnh | penconcept.vn |
| Theo vùng | TP.HCM 100–200k; HN 90–250k; ĐN/NT/CT 70–150k; tỉnh nhỏ 60–120k | Boothsummer (cập nhật 21/09/2026) |
| Theo nhóm | 1 người 80–120k; cặp đôi 120–180k; 3–4 người 150–250k; gói props/filter riêng 200–350k | Boothsummer |
| Cả buổi nhóm 4 người (gồm đi lại, in thêm) | **300.000–500.000đ** | Boothsummer |
| In thêm ảnh lẻ (HN) | 20.000–30.000đ/ảnh | updatevietnam.com |

### 3.3. Giá thuê photobooth cho sự kiện (Boothsummer, 21/09/2026)
| Loại | Giá |
|---|---|
| Booth tiêu chuẩn | 2,5–4tr/ngày; 3–5tr/gói 2–4h; 5–9tr/gói 4–6h |
| Booth 360 độ | 4–12tr |
| Booth gương | 5–8tr/ngày |
| Mini booth di động | 1,5–2,5tr/ngày |
| WOW Photobooth "CLASSIC" (HN) | **4,5tr/1h**; 5,7tr/2h; +1,5tr/giờ thêm; ảnh 10×15cm, in không giới hạn, gồm 1 nhân sự + setup; chưa VAT 8% |
| Fotopop (TP.HCM) | Sự kiện 3h in ~100 lần ≈ 200 dải ảnh; báo giá không công khai |
| Fotomoto, Printaphy, 96 Photobooth | Có guestbook + cỡ ảnh Polaroid/Strip/4R/Credit Card; **giá không công khai** |

### 3.4. Giá thiết bị & vốn mở tiệm (Boothsummer; hlgame.vn)
| Hạng mục | Giá |
|---|---|
| Mini booth di động | 20–35tr |
| Máy tiêu chuẩn | 35–55tr (nguồn 1) / 50–100tr kiosk TQ (nguồn 2) |
| Máy tầm trung màn hình lớn | 100–150tr |
| Máy Hàn Quốc (máy ảnh cơ + in DNP) | **150–350tr** |
| Booth 360 | 65–120tr |
| Booth gương | 80–150tr |
| **Tổng vốn mở tiệm 1–2 máy** | **300–600tr**; 3–4 máy có thể chạm 1 tỷ |
| Setup + trang trí / phòng chụp | 30–80tr/phòng |
| Mặt bằng (theo Boothsummer) | 10–30tr/tháng + cọc |
| Hòa vốn | cần vài nghìn → hơn 10.000 lượt khách |
| Thời gian hoàn vốn (ngành) | **4–12 tháng** (hlgame.vn); **6–12 tháng** (PHOTO TIME); **6–12 tháng** (Nghệ) |

### 3.5. Doanh thu thực tế (rất quan trọng cho §14)
| Đơn vị | Số liệu | Nguồn | Nhãn |
|---|---|---|---|
| **Nghệ** (2 máy, TP.HCM) | **10tr/ngày** ngày thường; **20–23tr/ngày** cuối tuần/lễ. Khách **100–180 lượt/ngày** thường, **200–300 lượt/ngày** cuối tuần. Vốn đầu tư **>1 tỷ** (thiết bị ~50%, không gian & concept ~40%, còn lại mặt bằng/marketing/nhân sự). Hoàn vốn 6–12 tháng | VTV Money 07/04/2026, phỏng vấn Founder Trần Thị Như Quỳnh | [S] |
| **Razzle Dazzle** | ~**60tr/tháng/máy**; ngày thường ~21–22 lượt (công suất ~30%/12h), cuối tuần ~36 lượt | Goodgood (ước tính của Goodgood) | [S] ước tính |
| **Life4Cut** | ~**50tr/tháng/máy**; thường 18 lượt/máy, cuối tuần/idol event >40 lượt/máy | Goodgood | [S] ước tính |
| **MonoClick** | ~**38tr/tháng/máy**; thường 12 lượt, cuối tuần 27 lượt | Goodgood | [S] ước tính |
| **PHOTO TIME** | ~**2.000 khách/ngày toàn hệ thống** (tháng 9/2025) | CafeF | [S] |
| **Photoism VN** | ~60 nhân sự cho 13 cơ sở (2025) | CafeF | [S] |

### 3.6. Số cửa hàng các chuỗi
| Brand | Số điểm | Thời điểm | Nguồn |
|---|---|---|---|
| PHOTO TIME | 51 → **56** chi nhánh (dự kiến +3 trong tháng 4/2026) | 9/2025 → 4/2026 | CafeF; VTV Money |
| Photoism VN | 1 → 13 chi nhánh trong 1 năm (từ Mỹ Đình HN, 5/2023); aggregator ghi **54 điểm ở TP.HCM, 13 Đà Nẵng, 7 Đồng Nai** | 2025 → 2026 | CafeF; reviewphotobooth.com |
| Life4cuts VN (Norang Company) | **>30 cửa hàng + phòng chụp lẻ, 8 tỉnh thành** | LinkedIn công ty | [S] |
| Razzle Dazzle | 4 cơ sở HN (83 Xuân Thủy, Times City, Vincom Phạm Ngọc Thạch…) | updatevietnam.com | [S] |

### 3.7. Hành vi khách hàng VN (dùng cho §4, §9)
- **Chờ đợi cực đoan**: cuối tuần chờ 10–15 phút là bình thường; tiệm mới hot có ca **lấy số chờ >4 tiếng**, cá biệt **>8 tiếng**; có nhóm mang sạc dự phòng + đồ ăn "cắm trại" 7–8 tiếng. Tết 2026 có nơi **bốc tới số 4.200**. (Kenh14 24/07/2025, 04/08/2025, 26/02/2026) `[F/S]`
- **Động lực là FOMO + sưu tầm**: Kenh14 chỉ rõ FOMO là "ngọn lửa"; giới trẻ "thích sưu tầm", gom photostrip vào sổ nhỏ (Mực Tím/Tuổi Trẻ 28/07/2025).
- **Giá KHÔNG phải yếu tố quyết định**: chủ tiệm nói khách ưu tiên **hình ảnh, không gian, trải nghiệm** hơn giá (VTV Money).
- **Bản sắc Việt có sức hút**: khách nói "Xứng đáng đợi cả tiếng vì background quá Việt Nam" (photobooth cạnh Hồ Gươm có view Tháp Rùa) — Kenh14 26/02/2026.
- **Concept lạ là lý do quay lại**: view thang máy, tàu điện, máy giặt, máy bay… (Mực Tím).
- **Quyền riêng tư là chuẩn ngành**: Photoism xoá file sau tối đa 72h, QR tải ảnh in trên tấm ảnh; PHOTO TIME lưu 3 ngày rồi xoá, CCTV lưu 30 ngày; điều khoản bảo mật cả với hợp đồng part-time. (CafeF)
- **Vận hành KHÔNG nhàn**: "ngộ nhận phổ biến là mở photobooth rất nhàn vì máy tự động" — thực tế cần theo dõi sát, vệ sinh, kiểm tra máy định kỳ (CafeF). Yếu tố sống còn: **vị trí, dịch vụ, thiết bị**.

### 3.8. Trend analog/film tại VN (dùng cho §2, §4, §12)
- Thanh Niên 15/04/2026: máy ảnh film "bùng nổ thành hiện tượng văn hoá", **các tiệm làm ảnh "thất thủ"** vì đơn tăng vọt. `[S]`
- VOV: người trẻ tìm về máy ảnh film, đĩa than để "sống chậm"; mỗi lần bấm máy như "đặt cược"; chờ vài ngày mới xem ảnh → "cảm giác hồi hộp giống một món quà".
- VOV (bài 2) — **insight then chốt**: "phần lớn người chơi film hiện nay thuộc thế hệ **chưa từng sống trong thời kỳ film phổ biến**. Họ không thật sự hoài niệm về một thời đại đã qua… thứ họ tìm kiếm là cảm giác của một nhịp sống khác." Và: "Một bức ảnh hơi mờ đôi khi lại giống ký ức thật hơn một tấm hình quá sắc nét."
- Tiền Phong/HHT 11/07/2025: trend film "nóng" lại; máy Mju II → Contax, Leica; film Kodak Gold, Fuji C200; có bạn tự học tráng film.
- truyenthongcuulong.com (2026): song song với film, **compact digicam CCD cũ** cũng bùng nổ (flash trực diện, màu ám xanh/hồng) → **[A] đây là đối thủ gián tiếp cạnh tranh cùng nhu cầu "ảnh không hoàn hảo"**.

### 3.9. Consumer data VN (dùng cho §4)
| Số liệu | Nguồn |
|---|---|
| Gen Z VN khoảng **13–16 triệu người**; PwC: đạt 15 triệu năm 2025; sức mua Gen Z toàn cầu 12 nghìn tỷ USD năm 2030 | bbw.vn dẫn PwC Vietnam |
| **47% Gen Z VN chi nhiều hơn cho trải nghiệm** (du lịch, ăn uống, sự kiện) — cao nhất các nhóm tuổi; mức chung người Việt 42% vs ASEAN 35% | UOB × BCG, ASEAN Consumer Sentiment Study 2024 |
| 2025: **8/10 người Việt coi trải nghiệm là phần thiết yếu**; chi thẻ cho ăn uống/giải trí/du lịch +8%, riêng **giải trí +48%** | UOB & BCG 2025, dẫn qua tapchikinhtetaichinh |
| 88% Millennials & Gen Z giữ nguyên/tăng ngân sách du lịch 2026; khách APAC chi cho trải nghiệm **gần gấp đôi** khách phương Tây | Klook Travel Pulse 2026 |
| Gen Z VN: 3–5 chuyến/năm, 2–4 ngày/chuyến; **>80% coi trải nghiệm là yếu tố quan trọng nhất**; 60–70% cân nhắc kỹ ngân sách | doanhnghiephoinhap.vn |
| TP.HCM 8T/2026: **7,77tr khách quốc tế (+38,5%)**, 35,5tr khách nội địa, tổng thu 259.696 tỷ (+48,8%). Mục tiêu cả năm: 11tr khách quốc tế / 61tr lượt / 330.000 tỷ | Sở Du lịch TP.HCM, qua VnEconomy & bvhttdl.gov.vn |

### 3.10. Mặt bằng TP.HCM (ngày kiểm tra 27/09/2026) — dùng cho §14
| Vị trí | Giá |
|---|---|
| Q3, 326 Lê Văn Sỹ, 80m², nhà phố mặt tiền 1 tầng | **21,3tr/tháng** (rao thấp hơn thị trường 15%; khu vực thường 25–30tr) |
| Q1, Tôn Thất Tùng, 40m², 1 trệt 2 lầu nguyên căn | 20tr/tháng |
| Q1, Lê Thị Riêng (Bến Thành), 4 tầng, DTSD 120m² | **50tr/tháng** |
| Q1, Mai Thị Lựu, 9×20m, trệt+lửng+2 lầu | 60tr/tháng |
| Q1, nhà hẻm/căn nhỏ (Tân Định, Cầu Kho, Phạm Ngũ Lão) | 5–10tr/tháng |
| Tham chiếu ngành photobooth | 10–30tr/tháng (Boothsummer) |

---

## 4. DATA CHI PHÍ VẬT TƯ (đã tính sẵn — ngày kiểm tra 27/09/2026)

### 4.1. Film 35mm + tráng scan → **chi phí/frame**
Giá film (Analog House, Shopee/Lazada qua muathongminh.vn):
Kodak Gold 200 36 kiểu **310.000đ** (Analog House) / 250.000đ (Shopee) · ColorPlus 200 **257.400đ** · Ultramax 400 **230.000đ** · ProImage 100 268.450đ · Portra 400 **440.000–475.000đ** · Portra 160 205.000–615.000đ (biến động lớn) · Portra 800 530.000đ · Kodak Vision3 500T (chiết) 130.000đ/24 kiểu · Fuji Superia X-Tra 400 outdate 265.000đ.

Tráng + scan C41: **50.000–80.000đ/cuộn**; film cine ECN-2: **90.000–95.000đ/cuộn** (analoghouse.vn — LLAB, Croplab, Noirfoto).

| Film | + dev 50k | + dev 80k |
|---|---|---|
| Ultramax 400 | **7.778đ/frame** | 8.611đ |
| ColorPlus 200 | **8.539đ/frame** | 9.372đ |
| Gold 200 (310k) | **10.000đ/frame** | 10.833đ |
| Portra 400 | 13.611đ | **14.444đ/frame** |

→ **Analog 35mm all-in ≈ 8.000–11.000đ/frame** (dùng Gold/ColorPlus/Ultramax).

### 4.2. Film instant → **chi phí/tấm** (đây là số quyết định business model)
| Loại | Giá hộp | Số tấm | **đ/tấm** |
|---|---|---|---|
| Instax mini viền trắng (Điện Máy Xanh / Instax Trà Sữa) | 190.000 | 10 | **19.000** |
| Instax mini phổ thông (Shopee) | 220.000–230.000 | 10 | 22.000–23.000 |
| Instax mini viền hình/Black Frame (Trà Sữa Station) | 299.000 | 10 | **29.900** |
| Instax Square | 285.000 | 10 | **28.500** |
| Instax Wide | 300.000 | 10 | **30.000** |
| **Polaroid i-Type** (Hà Lan, cho Now & OneStep) | 520.000 | 8 | **65.000** |
| **Polaroid 600 color frame** | 539.000 | 8 | **67.375** |

→ **Polaroid đắt gấp ~3,4 lần Instax mini và gấp ~7 lần film 35mm.**

### 4.3. Ngưỡng giá sàn nếu dùng Polaroid i-Type (65k/tấm) — BẢNG QUAN TRỌNG NHẤT
| Số tấm/lượt | COGS film | Giá cần để GM 55% | GM 65% | GM 70% |
|---|---|---|---|---|
| 2 tấm | 130.000 | 288.889 | **371.429** | 433.333 |
| 4 tấm | 260.000 | 577.778 | **742.857** | 866.667 |
| 6 tấm | 390.000 | 866.667 | 1.114.286 | 1.300.000 |
| 8 tấm | 520.000 | 1.155.556 | 1.485.714 | 1.733.333 |

### 4.4. Thay thế rẻ hơn (dùng cho §8, §13)
- **In ảnh kiểu Polaroid từ file số** (In Kỹ Thuật Số, giayinanh.com — đã gồm VAT):
  Mini 5,4×8,6cm: **4.700đ** (3–19 tấm) / 3.500 (20–49) / 2.400 (50–99) / **1.800** (≥100)
  Square 7,2×8,6: 5.300 / 4.100 / 3.000 / 2.200 · Wide 10,8×8,6: 5.900 / 4.700 / 3.500 / 2.900
  Cán màng +500đ/tấm. Từ 20 tấm tặng kẹp gỗ + dây đay.
  → **[A] Chênh lệch 4.700đ vs 65.000đ = 14 lần. Đây là lý do gần như mọi "photobooth vintage" ở VN chọn in số, và cũng là lý do "film thật" có thể defend được như một USP — nhưng phải bán được giá.**
- Vinadesign: in ảnh polaroid 5×9cm giấy C300 từ **2.500đ/tấm**.
- Máy Instax (Trà Sữa Station, chính hãng bảo hành 1 năm): Mini 12 combo 2.640.000đ · Mini 13 **2.450.000đ** · Mini LiPlay 5.292.000đ · Mini 99 5.292.000đ · Mini 70 2.800.000đ. Fujifilm giữ màu ảnh Instax **~40 năm** (theo Fujifilm, qua Trà Sữa Station).
- Giấy in nhiệt photobooth (DNP): **không tìm thấy dữ liệu công khai** → phải ghi assumption nếu dùng.

---

## 5. ĐỐI THỦ & BENCHMARK (đã verify)

### 5.1. Đối thủ Việt Nam
| Brand | Địa điểm | Mô hình | Giá | Ghi chú đáng học / điểm yếu |
|---|---|---|---|---|
| **Photoism** (nhượng quyền HQ) | 54 điểm TP.HCM, 13 ĐN, 7 Đồng Nai, HN… | Photobooth self-service, phòng khép kín có rèm | 70–100k; frame idol 150k | **Frame idol độc quyền Jisoo/J-Hope/Lisa/Jennie** — "át chủ bài", bản quyền rất đắt. Giữ concept basic, **không chạy trend ngắn hạn**, giữ giá từ ngày đầu. Xoá data sau 72h. IG/Threads `@photoism_vn` (Threads 2.237 followers), đang collab SOOBIN, Locket, Baddies Cosmetics. Yếu: phụ thuộc bản quyền idol, chi phí tăng mà không dám tăng giá. |
| **PHOTO TIME** (người Hàn sáng lập tại VN) | 56 chi nhánh toàn quốc | Chuỗi nhượng quyền + **hệ sinh thái app** | không công khai | **App từ 3/2023: >170.000 user đăng ký, +200–500 tài khoản/ngày**; lưu ảnh, voucher, frame theo mùa. Bán **goods độc quyền** (móc khoá, sổ mini). ~2.000 khách/ngày toàn hệ thống. Hoà vốn 6–12 tháng. |
| **Life4cuts** (Norang Co.) | >30 điểm, 8 tỉnh thành | Nhượng quyền thương hiệu HQ | 70–80k; Vincom Thủ Đức 85–165k | Đổi frame hàng tháng; frame Kpop chính thức với **YG, SM, HYBE**. Toàn cầu: 410 store tại HQ, 120 triệu lượt từ 2017. |
| **Razzle Dazzle** | 4 cơ sở HN (Xuân Thủy, Times City, Vincom PNT) | Chiếm **vị trí vàng TTTM** | 80k | Goodgood: mô hình "bền vững dựa trên bất động sản" — an toàn nhất, khó copy; nhưng chi phí thuê cực cao. ~60tr/tháng/máy. |
| **Nghệ – The Local Studio** | 57 Bis Lê Thị Riêng, P. Phạm Ngũ Lão, TP.HCM | Photobooth **bản sắc Việt**, 2 máy | không công khai | **Case study gần nhất với concept của team.** Tagline: "Nghệ trong từng khoảnh khắc, góc Việt trong từng góc ảnh". Founder: nhìn thấy khoảng trống "nhiều mô hình đi theo HQ/Mỹ nhưng chưa ai đầu tư sâu vào bản sắc văn hoá Việt". Vốn >1 tỷ. 10tr/ngày thường, 20–23tr cuối tuần. **Không nhận đặt lịch online — chỉ đến lấy số**. Đón cả khách nước ngoài. Web: nghe-home.the-local-studio.com |
| **Ngói** | 3 chi nhánh: Huế, Khánh Hoà, TP.HCM | Photobooth + thử nghiệm mới | không công khai | **Đã làm "in ảnh dạng âm bản phim"** — đối thủ gần nhất về ý tưởng analog. Founder Lương Gia Hân: làm mặt bằng 3–4 tuần + 1 tuần lắp máy/canh màu. |
| **MonoClick** | Hà Nội | Ngách tối giản, khách "có gu" | 80–100k | ~38tr/tháng/máy nhưng biên cao hơn, mặt bằng rẻ hơn, cộng đồng trung thành. |
| **MonoBooth** | P. Sài Gòn, TP.HCM | Chuyên ảnh **vintage** | không công khai | Khách chờ >1 tiếng; "màu ảnh vintage tạo cảm giác hoài niệm hơn ảnh chỉnh app" (Mực Tím). |
| **Pixie Photo** | Quận 1 (trên lầu chung cư) | Multi-room (P1–P6), có phòng retro | không công khai | Review thật (reviewphotobooth): P4 style retro màu vàng tối, **nóng vì không quạt**; ảnh in "mờ mờ", chất liệu photostrip không ưng; có bàn trang điểm + trang phục + phụ kiện; gửi xe 10k; từng cúp điện. → **[A] danh sách pain point vàng để thiết kế ngược.** |
| **Chi Studio Photobooth** | Quận 7 | Photobooth + photobook + gắp gấu bông | không công khai | Concept đổi theo mùa, phụ kiện & trang phục **miễn phí**. Hotline 0898 151 052 |
| **Lo Lo Đo Đo** | Long Biên, HN, 40m² | Photobooth **Hong Kong retro 80–90s** | không công khai | Thiết kế bởi Penconcept: hẻm gạch caro, poster chữ Hoa, đèn lồng, locker. |
| **Lidi Photobooth** | 214 Nguyễn Trãi, Q1 | **Retro cinema** | không công khai | Rèm đỏ, marquee "Cinema/Retro Movie", trang trí cuộn film. |
| **PixelB** | Tân Phú, TP.HCM | Retro Burgundy & Vintage Green | không công khai | Gỗ + đèn vàng + gương vintage. |
| **Photoby** | TP.HCM | **Photobooth + cafe**, 4 phòng (3 tự động + 1 Signature điều khiển từ xa) | không công khai | Có bút lông/sticker/băng dính để khách tự trang trí ảnh (ELLE). |
| **Photo Objet / Photo Won / Photo Story / Harufilm / PHOTO TIME** | TP.HCM, HN | Photobooth | 50k (Harufilm, theo updatevietnam) – 155k | Harufilm được nhắc là 1 trong 4 chuỗi phong cách HQ/Nhật phổ biến nhất. |
| **The Fuji Studio** | (hợp tác chuỗi/nhượng quyền) | Cung cấp giải pháp chuỗi photobooth + đẩy concept retro | không công khai | Bán concept retro bằng **hiệu ứng AI/film filter, hạt film, ánh sáng cháy, viền film** → bằng chứng thị trường đang *giả lập* analog. ⚠️ Website có dấu hiệu template lỗi (địa chỉ "28 Street, New York, USA") → **độ tin cậy thấp, chỉ dùng làm tín hiệu xu hướng.** |

**Nhóm analog/film thật (không cạnh tranh trực tiếp nhưng là đối tác/benchmark tiềm năng):**
| Đơn vị | Địa điểm | Sản phẩm | Giá |
|---|---|---|---|
| **Saigon Film Photowalk** | 38A & 73/8 Hồ Hảo Hớn, Q1 | Tour chụp film cho khách du lịch, máy vintage 70–80 năm tuổi | **550.000đ** (tự mang máy) / **750.000đ** (máy 135 + 1 cuộn BW 24–36 kiểu) / **1.150.000đ** (máy TLR + 1 cuộn 120 BW 12 kiểu). Trên Viator/Airbnb: **145–148 USD** (~£111–£148). Tour 3–4h, 6–8 khách/weekly tour, có ưu đãi sinh viên. Được book trước TB 9 ngày. |
| **Fox Spirit Film** | 38A Hồ Hảo Hớn, Q1 | Workshop tráng film BW | **480.000đ** (tự có film) / **580.000đ** (kèm 1 cuộn). 1h30, 9h30 T7 & CN hàng tuần |
| **LacaSoak** | 38A Hồ Hảo Hớn, Q1 | Workshop rọi ảnh phòng tối BW | **770.000đ**/người, 2,5h, T7&CN mỗi 2 tuần. Gồm giấy 8×10 + 5×7, hoá chất, máy rọi |
| **Airbnb "Analog Printing Darkroom"** | 73/8 Hồ Hảo Hớn, Q1 | Trải nghiệm phòng tối cho khách quốc tế | **từ £46/khách** (~1,5tr), mang về 3–4 ảnh 8×10 |
| **Noirfoto** | 199Bis Nguyễn Văn Hương, Thảo Điền | Phòng tối chuyên sâu: tráng/scan BW 135&120 + phim tấm, in gelatine 11×14→48×72 inch, **Lith, Cyanotype, Salt print**, khôi phục/số hoá phim cũ. Có gallery + workshop (từng dạy BW processing, hỗ trợ trọn đời DIY 50k/cuộn) | workshop hiện tại không công khai. Art Director **Phạm Tuấn Ngọc**, từng collab **Canon CB Space** (workshop 8/3/2026) |
| **LLAB / Croplab** | TP.HCM | Tráng scan C41, BW, Slide, Reversal, Cross-process, ECN-2; khổ 135/120/APS/110/Large format 4×5→8×10; nhận gửi bưu điện. Croplab dùng **Noritsu V50** | 50–95k/cuộn |
| **Analog House** | analoghouse.vn (TP.HCM) | Retail film chính hãng, xuất hoá đơn, freeship ≥300k, hoả tốc nội thành 2h, hotline 1900 299909 | Gold 200: 310k |
| **Trà Sữa Station / Instax Trà Sữa** | HN: 11 Ấu Triệu, 46 Quán Thánh · TP.HCM: 110 Hoa Lan (Cầu Kiệu) | **Nhà phân phối Instax tại VN từ 2017**; bán máy + dịch vụ **in ảnh Instax từ file** (Mini/Square/Wide), in Kodak Photo Printer, giấy lụa Canon Selphy | máy 2,45–5,3tr; in ảnh: không công khai đơn giá |
| **Hiệu Ảnh Phương Đông** | Hà Nội (Phố Hàng Coffee) | **Hiệu ảnh lâu đời nhất HN, film từ ~1940, gần 100 năm**. Concept "Hà Nội xưa bằng máy film", có vest cưới/áo dài/phụ kiện thiết kế đúng concept. Chụp Portra cho lễ dạm ngõ, ảnh cưới | không công khai. Threads `@hieuanhphuongdong1950`; Group "Ảnh Hà Nội Xưa" |
| **35mm Studio** | Tầng 8, số 4 ngõ 38 Yên Lãng, Đống Đa, HN | Wedding/family/portrait (tên là 35mm nhưng dịch vụ digital) | không công khai |
| **Tàu Năm Cửa Ô** | Hà Nội → Từ Sơn | Toa tàu phục dựng thập niên 80 để check-in vintage | không công khai |

### 5.2. Benchmark quốc tế
**Hàn Quốc** (quan trọng nhất):
- Doanh thu ngành "즉석사진 촬영기 운영업": 1.344 tỷ won (2020) → 1.337 (2021) → 2.471 (2022) → 2.906 (2023) → **3.196 tỷ won (2024)** = **×2,4**. Đóng cửa: 176 → 195 → 296 → 514 → **611 ca** = **×3,5**. (Cục Thuế QG HQ, qua văn phòng NS Cha Gyu-geun; Seoul Economic Daily 17/02/2026, Channel A, genica-photo.com)
- Quá tải cục bộ: **5 self-photo studio trong 130m** ở Seongsu-dong; tương tự gần ga Hongdae — dân địa phương nói "cách một căn lại có một tiệm".
- **Chi tiêu TB 8.693 won/lượt (~950 yên), tần suất 1,27 lần/tháng**; teen dùng nhiều nhất (Korea Consumer Agency, khảo sát 500 người).
- **3 business model HQ** (genica-photo.com) — rất hữu ích cho §6:
  ① Photobooth型 (Life4cuts, Photoism, Harufilm): **4.000–5.000 won**
  ② 有人セルフ型 (có nhân viên hướng dẫn, phòng riêng, đặt hẹn — Oddity Mode): **50.000–60.000 won**
  ③ 作家撮影型 (nhiếp ảnh gia chụp nhưng tư duy self-studio)
- **Life4cuts**: ~410 store HQ, **120 triệu lượt từ 2017**, ~2 triệu khách/tháng; giá 4.000 won/2 bản in, 8.000/4 bản, 12.000/6 bản (Korea Herald). Đã ra Singapore & London. Indonesia có brand nội địa Photograms, Palette ID.
- **Chi tiêu thẻ của khách du lịch nước ngoài tại photobooth HQ +65% YoY** (1–7/2025, Shinhan Card qua Korea Times) → bằng chứng tệp tourist có thật.
- **Oddity Mode (오디티모드)** — benchmark cho Model C: premium self studio, >15 chi nhánh (Gangnam, Hongdae ×2, Seongsu, Hannam, Konkuk, Songpa, Busan, Gwangju, Jeonju + trong khách sạn Shilla Stay). Tagline **"Film The Real You"**. Giá: **Color 60.000 won / Black 50.000 won**; qua kênh du lịch từ **45.000 won (~USD 30,25)**, Cinema Room **USD 40,33**. Gói gồm: **chụp 20 phút + chọn ảnh 20 phút + 2 ảnh retouch & in + video time-lapse + welcome drink + sticker**. Upsell: full file gốc 20.000₩, chọn thêm 1 ảnh 10.000₩, 1 set in 7.000₩, in 5×7 3.000₩, khung 5×7 5.000₩, in A4 10.000₩, khung A4 15.000₩, photo keyring 5.000₩, **poster package 9 cut A4 35.000→25.000₩**. Thêm người +10.000₩ (miễn phí nếu tham gia event). Giờ mở: T2–6 13:30–20:00, cuối tuần 11:00–21:00.

**Nhật Bản**:
- Purikura: đỉnh 1997 **>950 triệu USD/năm, 50.000 máy** → nay **~10.000 máy**, thị trường còn **~1/5 đỉnh** (từ ~100 tỷ yên còn ~20 tỷ). Chỉ còn **1 nhà sản xuất: Furyu (90–94% market share)**.
- Furyu FY2026: doanh thu **44,7 tỷ yên**; **lượt chơi giảm 29,57tr → 27,87tr**; dự kiến FY3/2027 tăng lại ~32tr (114,8% YoY); Pictlink paying member 1,27tr → dự kiến 1,29tr. Máy mới "YOUTH MY PALETTE" (11/2025) có **7 filter kiểu máy ảnh**. Kỷ niệm 30 năm purikura với project "DEAR Reiwa & Heisei Our Legendary Puri" (19/12 + bản PINK 3/2026) — **[A] bán chính nostalgia về purikura**.
- Máy purikura giá **~2,7 triệu yên (~18.000 USD)**; doanh thu từ máy + giấy sticker + subscription Pictlink. Phát triển 1 máy mất **~18 tháng**.
- Dân số học sinh Nhật giảm ~10%/thập kỷ → sức ép cấu trúc.
- **Fujifilm FY kết thúc 31/3/2026**: Consumer Imaging (instant photo + digital camera) doanh thu **+22,6% YoY → 141,4 tỷ yên**, operating income +1,1% → 24,5 tỷ yên. Driver: instax mini 12, mini Evo, WIDE 400, Link 3, WIDE Evo. → **[F] Instant film đang TĂNG mạnh trong khi purikura giảm.**

**Đức / Berlin — mô hình analog photobooth thật:**
- **Photoautomat**: Asger Doenst & Ole Kretschmann cứu các buồng BW bị thanh lý từ đầu 2000s, lập công ty **2004**. Directory chính thức **>30 máy** ở Berlin; boothbeacon ước tính **>100 buồng vintage** toàn thành phố — mật độ cao nhất thế giới.
- Giá: **€3/strip** (boothbeacon, kiểm tra 01/06/2026); một số nguồn ghi €2 hoặc **€4** (website thành phố Berlin) → **giá không nhất quán, phải ghi rõ**. **Chỉ nhận tiền xu/tiền mặt**, hoạt động **24/7 ngoài trời**. 4 ảnh/strip, tráng hoá chất ngay trong máy, **3–5 phút** mới rơi ra.
- Hầu hết cho ảnh **đen trắng** → đã thành bản sắc thị giác của Berlin. RAW-Gelände (Revaler Str.) có cụm máy đông nhất, RAW 3 cho **ảnh màu analog thật kiểu 1970s**.
- **Photomatica (San Francisco)**: sưu tầm buồng analog gốc để bảo tồn; **KHÔNG cho thuê buồng analog cho tiệc/cưới** (do bản chất vintage), chỉ cho thuê làm prop cho production. Tự chế 2 dòng digital lấy cảm hứng vintage: **Model 58** (từ Auto-Photo Model 12, open-air, cho nhóm đông) và **Model 67** (từ Photo-Me Model 17, kín, riêng tư nhất) — customize từ image wrap đến màu thanh treo rèm. Buồng analog cuối cùng được sản xuất **2004**; phụ tùng gốc **không còn sản xuất** → bảo trì là rào cản chuyên môn lớn.
- **Fotoautomat Berlin** (cho thuê event, digital nhưng vỏ retro): gói **€790 / €890 / €1.190** (24h, setup trước 48h, in không giới hạn, online gallery GDPR, GIF, branding). Chỉ cần 2×1m sàn + 220V.

**Thị trường film toàn cầu (dữ liệu quốc tế):**
- Film market **613 triệu USD (2026)** → 724 triệu USD (2035); **đơn hàng wholesale +127% từ 2020→2026**; **312 lab mới mở toàn cầu trong 1 năm** (>300 lab riêng 2025); Portra 400 +156% từ 2020; Gold 200 +118%; >20 triệu cuộn bán năm 2023 (+15% YoY). (pellica.app, keithtomlinsonphoto — **độ tin cậy trung bình, là blog tổng hợp**)
- **Kodak Q2/2026**: doanh thu 311 triệu USD (+18%), lãi ròng 17 triệu (từ lỗ 26 triệu), **Advanced Materials & Chemicals (gồm film) +40% → 105 triệu USD**; gross margin 26% (từ 19%). Kodak đầu tư **60 triệu USD** nâng cấp nhà máy Rochester (+18% output), lấy lại phân phối trực tiếp từ Kodak Alaris. **Cảnh báo**: nút thắt là **film finishing — lao động tay nghề khó tuyển**; giá nhôm & bạc tăng gây áp lực margin. (Fstoppers)
- **Ilford/Harman survey**: **65% người chụp film dưới 45 tuổi**, tăng mạnh nhất nhóm **25–34**. Ilford mở dây chuyền coating bền vững 2 triệu cuộn/năm. **Leica: bán máy film +900% trong 8 năm.**
- **FilmFocus 2025 Survey** (1.337 phản hồi, 30/11–31/12/2025, tập trung Nhật): Kodak **71%** vượt Fujifilm 68% (2024: Fuji 84% / Kodak 81%); Ilford 54%→4x%, Lomography 3x%→30%. **28% chụp nhiều hơn vs 26% chụp ít hơn**; **62% người giảm dùng film nói lý do là CHI PHÍ**. Người mới <1 năm: 49% tăng, chỉ 6% giảm. Lý do tăng phổ biến nhất: **mới mua máy film** (Pentax 17 được nhắc tên).
- Fortune 14/07/2026: 2025 có **42 triệu người dùng máy film toàn cầu, 35% ở tuổi 18–30**; search "analog photography" +41% năm trước đó. Vinyl vượt 1 tỷ USD tại Mỹ 2025, ~60% Gen Z mua đĩa than. PetaPixel gọi 2024 là "film's best year in decades".
- **Polaroid (công ty)**: doanh thu năm **~750 triệu USD**, 939 nhân viên (+7,1% YoY), HQ Hà Lan (LinkedIn — [S]). Lịch sử tên: The Impossible Project → Polaroid Originals → Polaroid. 2026: collab **Pokémon** (camera Pikachu); chiến dịch **anti-AI viral** (Patricia Varella, It's Nice That 03/08/2026) → **[A] đòn bẩy narrative rất mạnh cho brand analog.**
- Instant camera market: ~**2,1–2,2 tỷ USD (2026)** → 2,9–3,8 tỷ USD (2035), CAGR 3,2–6,8% (industryresearch.biz, MarkWide, marketreportsworld — **các report này chất lượng thấp/số liệu không khớp nhau, phải ghi rõ là ước tính của nhà cung cấp report**). 60–64% người mua là Millennials & Gen Z; **57% cho rằng ảnh vật lý có giá trị cảm xúc cao hơn ảnh số**; 41% dùng máy instant khi du lịch; APAC 38% hoạt động thị trường.

---

## 6. UNIT ECONOMICS ĐÃ TÍNH XONG (dùng nguyên cho §8 & §14)

**Giả định chung `[G]`**: 30 ngày/tháng. Khấu hao thiết bị + bảo trì gộp vào fixed cost. Chưa tính thuế TNDN. Mặt bằng theo §3.10. Nhân sự theo §6.5.

| Model | ARPU | Variable cost/khách | Contribution margin | GM% | Fixed/tháng | **Break-even** |
|---|---|---|---|---|---|---|
| **A — Low-cost (Instax Lite)** | 140.000 | 50.000 | 90.000 | **64%** | 54tr | **600 khách/tháng = 20/ngày** |
| **B — Mid (Analog Studio + Community)** | 320.000 | 95.000 | 225.000 | **70%** | 82tr | **364 khách/tháng = 12,1/ngày** |
| **C — Premium (Polaroid-heavy)** | 650.000 | 360.000 | 290.000 | **45%** | 120tr | **414 khách/tháng = 13,8/ngày** |
| **C' — Premium (Instax Wide-heavy)** | 650.000 | 200.000 | 450.000 | **69%** | 120tr | **267 khách/tháng = 8,9/ngày** |

### Sensitivity (EBITDA/tháng, đơn vị triệu đồng)
| Khách/ngày | A | B | C (Polaroid) | C' (Instax Wide) |
|---|---|---|---|---|
| 10 | **−27,0** (−64,3%) | **−14,5** (−15,1%) | **−33,0** (−16,9%) | **+15,0** (+7,7%) |
| 20 | 0,0 (0,0%) | +53,0 (27,6%) | +54,0 (13,8%) | +150,0 (38,5%) |
| 30 | +27,0 (21,4%) | +120,5 (41,8%) | +141,0 (24,1%) | +285,0 (48,7%) |
| 50 | +81,0 (38,6%) | +255,5 (53,2%) | +315,0 (32,3%) | +555,0 (56,9%) |

Doanh thu tương ứng (tr/tháng): A = 42/84/126/210 · B = 96/192/288/480 · C & C' = 195/390/585/975

### Cấu phần đã dùng để ra fixed cost `[G]`
- A: rent 20tr + staff 16tr (2 người) + utilities 4tr + marketing 8tr + maintenance/khấu hao 6tr = **54tr**
- B: rent 30tr + staff 25tr (3 người, cần người biết film) + utilities 6tr + marketing 12tr + maintenance/khấu hao 9tr = **82tr**
- C/C': rent 45tr + staff 35tr + utilities 8tr + marketing 20tr + khấu hao 12tr = **120tr**

### Cấu phần variable cost `[G]`
- A: 2,2 tấm Instax mini × 19–23k ≈ 46k + packaging 3k + phí thanh toán 1k = **50k**
- B: mix film 35mm (8–11k/frame) + tráng scan + 4 ảnh in + 1 Instax + packaging = **95k**
- C: 5 tấm Polaroid i-Type × 65k = 325k + packaging 25k + scan 5k ≈ **360k** (làm tròn)
- C': 5 tấm Instax Wide × 30k = 150k + packaging + scan ≈ **200k**

### **[A] Kết luận từ bảng trên (phải viết vào §14 và §18)**
1. **Model C' (premium dùng Instax Wide) là mô hình có unit economics tốt nhất**: break-even thấp nhất (8,9 khách/ngày) dù fixed cost cao nhất, và là mô hình duy nhất **có lãi ngay ở mức 10 khách/ngày**.
2. **Model C (Polaroid thật) đắt hơn nhưng margin chỉ 45%** — mất 24 điểm % margin so với C'. Polaroid thật là một **quyết định thương hiệu, không phải quyết định tài chính**. Nếu chọn, phải chấp nhận nó là "sản phẩm cờ hiệu" (hero SKU) chạy song song với dòng Instax margin cao.
3. **Model A là bẫy**: break-even 20 khách/ngày ở mức giá 140k, tức phải đạt gần đúng công suất của Life4Cut (18 lượt/ngày thường) — nhưng không có thương hiệu Hàn, không có frame idol. **[A] Không nên chơi Model A nếu không có lợi thế vị trí.**
4. Model B có break-even thấp thứ hai và **doanh thu đa nguồn** (session + workshop + tour + retail + event) → phòng thủ tốt nhất khi trend photobooth hạ nhiệt.

### Các assumption BẮT BUỘC test bằng MVP (viết vào §19)
| # | Assumption | Cách test |
|---|---|---|
| 1 | Khách VN chấp nhận trả **250k–700k** (3–5× giá photobooth) cho analog/instant thật | Pop-up bán 3 mức giá, đo conversion từng mức |
| 2 | Khách chấp nhận **chờ 2–5 ngày** nhận ảnh film (hoặc chờ 10–15 phút cho Polaroid lộ sáng) | Đo tỷ lệ bỏ giỏ khi biết thời gian chờ |
| 3 | Tệp **khách quốc tế** thực sự tiếp cận được ngoài kênh Viator/Airbnb | Test listing + đo CAC theo kênh |
| 4 | Tỷ lệ **ảnh hỏng** thực tế (film/Polaroid) ở tay khách không biết chụp | Đếm tấm hỏng/lượt trong 30 ngày → quyết định chính sách bù ảnh |
| 5 | Ảnh Polaroid/film có **share lên social** nhiều hơn photostrip số hay không | Đếm tag/mention trên 100 khách đầu |
| 6 | **Repeat rate** — điểm yếu chí tử: analog đắt nên khả năng quay lại thấp hơn photobooth 80k | Cohort 60–90 ngày |
| 7 | Nguồn cung film Polaroid tại VN có **ổn định & đủ số lượng** cho vận hành thương mại | Test đặt 20–30 hộp, đo lead time & biến động giá |

---

## 7. CẤU TRÚC 20 PHẦN PHẢI VIẾT (checklist)

- [ ] **1. EXECUTIVE SUMMARY** — 10–15 insight quan trọng nhất (thị trường/khách/đối thủ/cơ hội)
- [ ] **2. DEFINE THE CATEGORY** — Analog là gì; Instant/Polaroid là gì; Photobooth là gì; digital vs analog/instant booth; **có hợp lý khi gộp analog + Polaroid 1 brand?** (dùng §2.2); nếu có thì định nghĩa category bằng ngôn ngữ marketing
- [ ] **3. PRODUCT/EXPERIENCE ANALYSIS** — SWOT nhỏ cho Analog camera / Polaroid / Instax / Digital photobooth / Smartphone; bảng so sánh 12 tiêu chí (image quality, experience, emotional value, nostalgia, social sharing, convenience, **cost per shot** (dùng §4), repeatability, uniqueness, perceived value, community potential); **trả lời "khách thực sự mua cái gì?"** — không được trả lời "họ mua ảnh"
- [ ] **4. CUSTOMER RESEARCH** — 8 nhóm (Gen Z, Millennials, Couples, Friends, Tourists, Photography enthusiasts, Wedding/event, Brands/corporate) × 8 chiều (Need, Pain point, Motivation, WTP, Trigger, Lý do quay lại, Content họ share, Rào cản) + trích dẫn §3.9
- [ ] **5. VIETNAM MARKET RESEARCH** — bảng đối thủ 14 cột. **Chia thành 2–3 bảng hẹp hơn để PDF không vỡ.** Dùng §5.1. Thiếu thì ghi "không công khai"
- [ ] **6. COMPETITOR LANDSCAPE** — 7 nhóm A–G + competitor map. **Đề xuất framework tốt hơn**: trục X = *Mức độ analog thật* (digital giả lập ↔ hoá học thật), trục Y = *Giá / perceived value*. Có thể thêm map thứ 2: *Instant gratification ↔ Delayed reward*
- [ ] **7. INTERNATIONAL BENCHMARK** — HQ, Nhật, Mỹ, Châu Âu, SG/TH. Dùng §5.2. Mỗi case: bán gì / pricing / customer journey / space design / business model / social strategy / vì sao khách đến / **áp dụng được gì ở VN** / **KHÔNG nên copy gì**. (Thái Lan/Singapore: chỉ có data Life4cuts & Photomatic đã vào Singapore + London — ngoài ra **không tìm thấy dữ liệu công khai**, phải ghi rõ)
- [ ] **8. BUSINESS MODEL** — revenue streams, pricing, cost structure (film/equipment/rent/staff/maintenance/marketing/packaging/digital backup/upsell) + **3 model A/B/C** với unit economics từ §6
- [ ] **9. CUSTOMER JOURNEY** — 11 bước từ Awareness → Return/referral; mỗi bước: moment of delight / pain point / opportunity / viral moment. Dùng pain point thật của Pixie Photo (§5.1) + chờ 4–8h (§3.7)
- [ ] **10. BRAND POSITIONING** — 5 hướng (Nostalgia / Memory / Authentic analog / Romantic-couple / Art-creative). Mỗi hướng: Target, Brand promise, Key message, Visual identity, Tone of voice, Tagline, Content direction + **trade-off**. **KHÔNG chọn hộ team**
- [ ] **11. USP** — ≥10 USP defend được, phân biệt Feature / Benefit / Emotional benefit / True USP
- [ ] **12. IG/TIKTOK STRATEGY** — 8 nhóm content + **20 content pillars, 30 video ideas, 10 viral hooks, 10 carousel ideas, 10 storytelling formats** + cách biến ảnh analog thành content (không chỉ đăng ảnh sản phẩm)
- [ ] **13. PRICING** — benchmark thật (§3.2) + architecture: Entry / Standard / Couple / Premium / Group / Event / Corporate + logic & perceived value
- [ ] **14. UNIT ECONOMICS** — dùng nguyên §6 + sensitivity 10/20/30/50 khách/ngày
- [ ] **15. RISKS** — 12 risk (film cost, supply, camera failure, film failure, customer dissatisfaction, waiting time, low repeat, trend fading, competitor copying, rent, seasonality, social media dependency) + mitigation từng cái. Dùng evidence §2.3
- [ ] **16. SWOT** — cụ thể cho Analog + Polaroid Photo Room tại TP.HCM
- [ ] **17. WHITE SPACE** — ≥5 gap, mỗi gap **phải có evidence**. Dùng §2.4
- [ ] **18. RECOMMENDATION FRAMEWORK** — decision matrix 9 tiêu chí (Market demand, Differentiation, Initial investment, Gross margin potential, Operational complexity, Viral potential, Repeatability, Scalability, Defensibility). **Không tự chấm điểm "cái nào tốt nhất"** — chỉ đưa data/assumption + ô trống để team tự chấm
- [ ] **19. MVP** — test 30 ngày không cần mặt bằng lớn (pop-up / event / temporary room / collab cafe / weekend booth): Setup, Budget, Equipment, Pricing, Marketing, KPI, Test hypothesis (dùng 7 assumption §6), Success criteria, Kill criteria
- [ ] **20. FINAL OUTPUT** — A. 1-page market summary · B. Competitor table · C. Customer segments · D. Positioning options · E. Business model options · F. Pricing benchmark · G. MVP plan · H. 90-day marketing roadmap
- [ ] **KẾT: "10 insight quan trọng nhất team cần mang vào buổi meeting"**

---

## 8. FILE & LỆNH XUẤT PDF

**Vị trí file cần tạo:**
```
/Users/trungbn/trungbn_working_space/md-to-pdf/reports/analog-polaroid-photo-room-market-research-2026.md
/Users/trungbn/trungbn_working_space/md-to-pdf/reports/analog-polaroid-photo-room-market-research-2026.pdf
```

**Front matter nên dùng:**
```yaml
---
title: "Analog + Polaroid Photo Room — Market Research & Strategic Analysis (TP.HCM, 2026)"
header: "Confidential — Internal Strategy Document | 27/09/2026"
theme: github
---
```

**Lệnh xuất PDF** (đã chạy thành công 27/09/2026 — Node v24.2.0, ra 125 trang A4 trong ~3s).
⚠️ **Bắt buộc có 2 dòng `export`**, nếu không Puppeteer báo lỗi "Could not find Chrome":
```bash
cd /Users/trungbn/trungbn_working_space/md-to-pdf
export PUPPETEER_SKIP_DOWNLOAD=true
export PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
node src/cli.js reports/analog-polaroid-photo-room-market-research-2026.md \
  --toc --toc-depth 2 --page-numbers --theme github \
  --format A4 --margin "18mm 14mm"
```

**Lưu ý kỹ thuật khi viết md:**
- Bảng >8 cột sẽ **vỡ layout A4** → chia nhỏ bảng hoặc thêm `--landscape` cho riêng bản phụ lục.
- Chèn ngắt trang bằng `<!-- pagebreak -->` giữa các phần lớn.
- md2pdf hỗ trợ GFM: bảng, task list, footnote, autolink, attribute syntax; syntax highlight 190+ ngôn ngữ.
- Chrome không vẽ background ở lề trang tiếp theo → **không dùng background màu toàn trang**; tint cho element (bảng, code block, callout) thì in tốt.
- Nếu Chromium lỗi: `export PUPPETEER_SKIP_DOWNLOAD=true` + `export PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`.

---

## 9. DANH SÁCH NGUỒN (để chèn citation)

**Việt Nam — báo chí & report**
1. VTV Money, "Photobooth: Kinh doanh từ trải nghiệm cảm xúc có 'dễ thắng'?", 07/04/2026 — https://money.vtv.vn/photobooth-kinh-doanh-tu-trai-nghiem-cam-xuc-co-de-thang-109260407153427023.htm
2. CafeF, "Ngành photobooth đang hot nhất Việt Nam sống nhờ điều gì?", 04/10/2025 — https://cafef.vn/nganh-photobooth-dang-hot-nhat-viet-nam-song-nho-dieu-gi-2-tong-quan-thuong-hieu-dinh-dam-tiet-lo-toan-bo-18825100409460267.chn
3. Goodgood Report, "Khởi nghiệp bằng Photobooth: Bây giờ có phải là muộn? Thị trường Photobooth Hà Nội 2026", 09/10/2025 — https://goodgood.vn/khoi-nghiep-bang-photobooth-bay-gio-co-phai-la-muon-danh-gia-thi-truong-photobooth-ha-noi-trong-nam-2026/
4. Boothsummer, "Chụp photobooth bao nhiêu tiền? Bảng giá 2026", đăng 04/09/2026, cập nhật 21/09/2026 — https://www.boothsummer.com/vn/bai-viet/chup-photobooth-bao-nhieu-tien
5. Kenh14, "Cơn sốt photobooth… xếp hàng đợi 8 tiếng", 24/07/2025 — https://kenh14.vn/con-sot-photobooth-quay-tro-lai-va-can-quet-khap-noi-co-noi-150k-anh-xep-hang-doi-8-tieng-van-khien-gioi-tre-phat-cuong-215250724154619365.chn
6. Kenh14, "…bốc 4200 số, vạ vật 8 tiếng…", 26/02/2026 — https://kenh14.vn/ai-bao-photobooth-thoai-trao-chac-nga-ngua-canh-dan-tinh-boc-4200-so-va-vat-8-tieng-dang-tien-ruoc-hai-tam-anh-teo-teo-215260226151916443.chn
7. Kenh14, "…mang cả sạc dự phòng 'cắm trại' trong tiệm photobooth", 04/08/2025
8. Mực Tím / Tuổi Trẻ, "Vì sao photobooth đến giờ vẫn chưa chịu hạ nhiệt?", 28/07/2025 — https://muctim.tuoitre.vn/vi-sao-photobooth-den-gio-van-chua-chiu-ha-nhiet-101250728151557688.htm
9. Thanh Niên, "Chụp ảnh film: Khi Gen Z đua nhau chọn 'sống chậm'", 15/04/2026
10. VOV, "Giới trẻ tìm về với công nghệ hoài cổ" + "Người trẻ đang 'nghiện' ảnh film vì điều gì?"
11. Tiền Phong/HHT, "Cơn sốt chụp ảnh film trở lại", 11/07/2025
12. ELLE Việt Nam, "7 địa điểm chụp ảnh photobooth nổi bật tại Sài Gòn"
13. haisanongba.com, "Kinh doanh photobooth: Bài toán thu hồi vốn và thách thức quản lý"
14. hlgame.vn, "Giá máy photobooth bao nhiêu? Cập nhật xu hướng & kinh doanh 2026"
15. VnEconomy / Bộ VHTTDL — số liệu du lịch TP.HCM 8T/2026
16. bbw.vn — Gen Z VN (dẫn PwC Vietnam, UOB×BCG 2024)
17. Tạp chí Kinh tế Tài chính, "Cơ chế phòng vệ trong tiêu dùng trải nghiệm của Gen Z" (dẫn UOB&BCG 2024, 2025)
18. Advertising Vietnam — Klook Travel Pulse 2026
19. doanhnghiephoinhap.vn — Gen Z Việt & du lịch

**Việt Nam — website doanh nghiệp / giá**
20. reviewphotobooth.com (aggregator + review thật của Pixie Photo)
21. poidata.io/report/photo-booth/vietnam
22. analoghouse.vn (giá film, danh sách lab)
23. trasuastation.vn (Instax phân phối, giá film & máy, dịch vụ in)
24. giayinanh.com (bảng giá in ảnh kiểu Polaroid, gồm VAT)
25. muathongminh.vn (lịch sử giá film Kodak / Instax / Polaroid)
26. saigonfilmphotowalk.com + /faq (giá tour); Viator d352-217392P1; Airbnb experiences/6794412
27. store.foxspirit.vn/self-developed-black-and-white-film-workshop; veve.com.vn (LacaSoak darkroom)
28. nghe-home.the-local-studio.com (Nghệ); chistudiophotobooth.com; penconcept.vn (Lidi, PixelB, Lo Lo Đo Đo, top 10 Q1)
29. wowphotoboothvn.com (giá CLASSIC booth); fotopop.studio; fotomoto.vn; printaphy.com; 96photoboothco.vn
30. threads.com/@photoism_vn; linkedin.com/company/norang-company-ltd-co (Life4cuts VN)
31. thelandmark81.com.vn; updatevietnam.com; vietnamtour247.com (Mononow)
32. saigoneer.com (Noirfoto workshop); booking.vn.canon (Canon × Noirfoto)
33. thefujistudio.com — ⚠️ độ tin cậy thấp (template lỗi), chỉ dùng làm tín hiệu xu hướng retro
34. batdongsan.com.vn, timnhapho.vn, alonhadat.com.vn, housenow.com.vn, muaban.net (giá thuê mặt bằng)

**Quốc tế**
35. Seoul Economic Daily (EN), "Photo Booth Closures Triple as Market Overheats", 17/02/2026 — https://en.sedaily.com/news/2026/02/17/photo-booth-closures-triple-as-market-overheats-despite-mz
36. Channel A News (KR), 즉석사진관 폐업 3.5배 늘어
37. genica-photo.com/lab/notes/korea-self-photo-studio-2026 (3 business model HQ, 8.693 won/lượt, 1,27 lần/tháng — dẫn Korea Consumer Agency)
38. Korea Herald, "Say 'kimchi': How photobooths have filled Korean streets"
39. daebak.co — Life4cuts 410 store / 120 triệu lượt; Shinhan Card +65% khách quốc tế (dẫn Korea Times)
40. odtmode.com/PRICE + /about + /reservation (Oddity Mode); seoultravelpass.com; pelago.com
41. France 24, "Surviving selfies: Japan's purikura photo booths cling on"
42. tokyoscope.blog, "Purikura at 30"
43. Furyu FY2026 TDnet filing — finance.biggo.com/news/jpx_tdnet_140120260513529417
44. Fujifilm Holdings, FY ended 31/03/2026 results — https://holdings.fujifilm.com/en/news/list/2127
45. boothbeacon.org (Photoautomat Berlin Mitte €3, kiểm tra 01/06/2026; guide Berlin >100 booth)
46. foodieexplorers.co.uk/berlin-photoautomat (lịch sử Photoautomat, giá €4 theo website Berlin)
47. photomatica.com/analog-photo-booth-guide (Model 58/67, không cho thuê booth analog)
48. fotoautomat-berlin.de (gói €790/€890/€1.190)
49. Fstoppers, "Kodak Film Surges 40% in Q2 2026"
50. Digital Camera World — FilmFocus 2025 Survey (1.337 phản hồi)
51. Fortune, "Gen Z's analog obsession is reviving a film camera market", 14/07/2026
52. keithtomlinsonphoto.com — Harman survey 65% <45 tuổi, Leica +900%
53. pellica.app/blog/film-photography-revival-2026 — ⚠️ blog tổng hợp, độ tin cậy trung bình
54. LinkedIn/company/polaroid (doanh thu ~750tr USD); It's Nice That (chiến dịch anti-AI của Polaroid)
55. industryresearch.biz / markwideresearch.com / marketreportsworld.com — ⚠️ report thương mại chất lượng thấp, số liệu lệch nhau, chỉ dùng kèm cảnh báo
56. Future Market Insights (photobooth toàn cầu 584,7tr USD 2025 → 1,43 tỷ 2035) — truy cập qua VTV Money & hlgame.vn, **chưa đọc bản gốc**

---

## 10. NHỮNG CHỖ PHẢI GHI "KHÔNG TÌM THẤY DỮ LIỆU CÔNG KHAI"

- Giá của: Nghệ, Ngói, MonoBooth, Pixie Photo, Chi Studio, Lidi, PixelB, Lo Lo Đo Đo, Photoby, Photo Objet, Photo Won, Photo Story, PHOTO TIME (giá/lượt), Harufilm (chỉ có 1 nguồn thứ cấp ghi ~50k)
- Đơn giá in ảnh Instax của Trà Sữa Station
- Giá giấy in nhiệt DNP cho photobooth tại VN
- Doanh thu/lợi nhuận thực của bất kỳ photobooth VN nào (chỉ có con số do founder tự nêu hoặc Goodgood *ước tính*)
- Follower/engagement chính xác trên IG & TikTok của các brand VN (chỉ verify được Threads @photoism_vn = 2.237 followers) → **nếu cần số IG/TikTok phải kiểm tra lại trực tiếp, KHÔNG được bịa**
- Mô hình analog photobooth tại **Singapore & Thái Lan** (chỉ biết Life4cuts + Photomatic có mặt ở Singapore)
- Số liệu thị trường photobooth/analog **riêng cho Việt Nam** từ một market research house chính thống (Nielsen/Kantar/Decision Lab/Q&Me) — không tìm thấy
- Quy mô cộng đồng film VN (số thành viên group, số lab, số cuộn tráng/tháng)

---

## 11. GHI CHÚ NỘI BỘ CHO SESSION SAU

1. **Không cần search lại.** Toàn bộ số liệu trong file này đã được lấy từ web ngày 27/09/2026.
2. ~~Viết báo cáo chia 3 lần Write~~ → **ĐÃ LÀM XONG.** Thực tế đã chia **4 lần Write** (`_p1`–`_p4`) rồi `cat` lại và xoá file tạm. Cách chia đã dùng: p1 = §1–§4 · p2 = §5–§9 · p3 = §10–§14 · p4 = §15–§20 + 10 insights + phụ lục nguồn. Chia 4 an toàn hơn chia 3 vì §12 (20 pillar + 30 video idea) và §15 (12 risk) rất dài.
3. Lỗi đã gặp: gọi Write với parameter sai tên (`raw` thay vì `path`+`contents`) → luôn kiểm tra đúng 2 parameter `path` và `contents`.
4. Giữ **giọng consultant**: thẳng, có số, dám nói concept có thể thất bại. User đã yêu cầu rõ điều này.
5. Đừng quên 2 câu hỏi user hỏi trực tiếp, phải trả lời dứt khoát:
   - "Khách thực sự đang mua cái gì khi trả tiền chụp Polaroid/analog?" → **đã trả lời tại §3.5 của báo cáo** (5 thứ khách mua, xếp theo trọng số)
   - "Có hợp lý khi đặt analog + Polaroid dưới cùng một brand/category không?" → **đã trả lời tại §2.4 của báo cáo** (CÓ ở tầng brand, KHÔNG ở tầng SKU/vận hành)
6. **Các yêu cầu đặc biệt của user đều đã được tuân thủ trong báo cáo:** phân biệt 4 nhãn F/S/A/G; ghi ngày kiểm tra giá; ghi rõ "không tìm thấy dữ liệu công khai" (có bảng riêng ở phụ lục); §10 Positioning **không chọn hộ team** (5 hướng + bảng trade-off); §18 Decision matrix **để ô trống cho team tự chấm**, không tự chấm điểm; §8 Business model trình bày **từng option** song song; §11 USP phân biệt rõ 4 tầng và **loại thẳng 7/12 ứng viên xuống "chỉ là feature"**; §15 Risks dựa trên 8 bằng chứng thất bại có thật (HQ, Nhật, VN).
7. **Nếu user muốn sửa:** file `.md` là nguồn duy nhất, sửa xong chạy lại lệnh §8 là ra PDF mới. Đã chèn `<!-- pagebreak -->` giữa các phần lớn; bảng rộng nhất là 7 cột (§3.2, §14) — đã verify render đẹp trên A4, không vỡ layout.
