# Trả lời phỏng vấn FE: Cache & Optimize Performance (PM-frontend)

## Context
Bạn bị hỏi về kinh nghiệm cache và tối ưu hiệu năng ở project này nhưng chưa trả lời được. Mình đã review code và git history: bạn có nhiều commit nhất repo (1282) và đã làm nhiều việc thật về performance, nhưng **cache phía client còn khá hạn chế**.

Chiến lược nên dùng: kể đúng những gì đã làm, nói rõ giới hạn và hướng cải thiện. Trả lời như vậy vừa an toàn vừa cho thấy tư duy senior.

**Chưa có số đo:** repo không có Profiler, web-vitals hay số liệu trước/sau. Đừng tự nghĩ ra con số như "giảm 40%".

---

## Câu trả lời 60 giây (nói được ngay)
> "Project là hệ thống quản lý purchase order cho ngành y tế, dùng React 19, Redux Toolkit và RTK Query, có nhiều màn hình bảng dữ liệu lớn. Em tối ưu ở ba tầng.
>
> **Tầng load:** em code-split theo route bằng `React.lazy` và `Suspense`, nên user chỉ tải code của trang họ vào.
>
> **Tầng data:** dữ liệu PO có phân trang ở server. Với PO lines và PO headers, em normalize bằng `createEntityAdapter`, để cập nhật một dòng không phải đụng cả list. Em cũng có một cache theo id cho danh sách assignee của từng dòng, tránh gọi lại API khi mở lại dropdown.
>
> **Tầng render:** em dùng `useMemo` và `memo` để giữ ổn định reference của data truyền vào bảng, tránh re-render không cần thiết.
>
> Về cache, dữ liệu PO thay đổi liên tục và ảnh hưởng đến nghiệp vụ, nên hiện tại team ưu tiên dữ liệu mới: phần lớn màn hình fetch lại khi cần và dashboard auto-refresh theo interval cấu hình được. Static assets thì cache dài hạn ở nginx. Nếu làm tiếp, em sẽ tận dụng tag invalidation của RTK Query cho master data như buyer và vendor, vì đó là chỗ đang fetch lại nhiều mà ít thay đổi."

---

## Những gì bạn đã làm (có bằng chứng)
| Chủ đề | Đã làm gì | Bằng chứng |
|---|---|---|
| Code splitting | 25 route dùng `lazy`, chung một `Suspense` | `src/App.tsx:15-84`, commit `51e7d37b` |
| Normalize state | `createEntityAdapter` cho PO lines, PO headers, users, ack performance | `src/shared/slices/Dashboard/poLines.slice.ts`, commit `314a4ffa` |
| Memoization | Memo `params` và data chart ở dashboard; memo data bảng PO thay vì `.map()` trong JSX | commit `f1cee631`, `c66a5f92` |
| `React.memo` | Bảng con và item thông báo | `SubTable.tsx:172`, `NotificationItem.tsx:13` |
| Cache theo id và chặn gọi trùng | `Map` theo line/corp, `Set` các id đang load, có tùy chọn `useCache: false` | `useFetchAssigneesForLine.ts` |
| Tải dữ liệu từng phần | Phân trang server, infinite scroll cho comment và log, loading riêng cho từng card | `Comments/index.tsx`, `LogList/index.tsx`, commit `383f17b1` |
| Dashboard | Đợi master data bằng `Promise.all` rồi mới tải widget; polling theo interval | `DashboardPage/index.tsx:26,53` |
| Static assets | Gzip và `expires 1y` cho `/assets` (file có hash) | `nginx.conf` |

## Câu chuyện nên kể khi bị hỏi sâu
**Thử chia chunk thủ công rồi revert (đây là câu chuyện có giá trị nhất).** Ngày 2025-08-15 bạn thêm `manualChunks` và cấu hình terser, trong code có ghi chú về lỗi `"Ge is not a function"` (`5c102c7a`). Cùng ngày bạn revert (`10e4ef27`), đến 08-24 thì chỉ áp dụng lại lazy theo route (`51e7d37b`).
- Bài học gợi ý: chia chunk thủ công có thể gây lỗi ở production do thứ tự load module, nên chỉ làm khi có số đo chứng minh cần thiết.
- **Hãy nhớ lại nguyên nhân thật.** Git không ghi rõ lý do revert, và việc do thứ tự load chỉ là suy đoán của mình.

**Sửa bảng PO re-render.** `data={ids.map(...)}` tạo mảng mới ở mỗi lần render, nên bảng nhận reference mới dù dữ liệu không đổi. Bạn chuyển sang `useMemo` theo `ids` và `entities` (`c66a5f92`).

---

## Đừng nói quá (dễ bị hỏi vặn)
- **Đừng nói "dùng RTK Query để cache".** 35 chỗ gọi `useLazy...Query` đều không truyền `preferCacheValue`, nên mặc định luôn gọi lại API. Kết quả còn được copy sang slice riêng. RTK Query ở đây chủ yếu lo việc fetch và trạng thái loading.
- **Không có** tag invalidation (`providesTags`), `createSelector`, virtualized table, debounce, hay persist ra `localStorage`. `redux-persist` có cài nhưng chỉ dùng hằng số action trong `store.ts`.
- Nếu bị hỏi, cứ nói thẳng: "Chỗ này bọn em chưa làm, nếu làm em sẽ..."

## Điểm yếu nên chủ động nêu (ghi điểm tốt)
1. **Cache RTK Query gần như không được tận dụng:** buyer và vendor bị tải lại ở nhiều trang. Hướng sửa: dùng `useQuery` kèm `providesTags`, tăng `keepUnusedDataFor`, và bỏ bước copy sang slice.
2. **Bug nhỏ:** `keepUnusedDataFor: 0` đặt nhầm trong `query()` nên không có tác dụng (`getPOManagementsAPI.ts:186`). Option này phải nằm ở cấp endpoint.
3. **Rủi ro trong cache assignee:** code đọc cờ `alreadyCached` và `shouldFetch` từ bên trong updater của `setState`, mà React có thể chạy updater muộn. Nên dùng `useRef` hoặc cache của RTK Query.
4. **Nginx:** `index.html` chưa có `no-cache` tường minh, nên sau khi deploy trình duyệt có thể giữ bản cũ. Nên thêm `immutable` cho `/assets`. Ngoài ra `add_header` trong `location /assets` làm mất các security header khai báo ở cấp server.
5. **Thiếu đo lường:** nên thêm `web-vitals`, React Profiler và bundle analyzer. `@ant-design/plots` chỉ dùng ở `PieChart` nên đáng kiểm tra kích thước bundle.

## Câu hỏi có thể gặp
- **Cache dữ liệu PO thế nào?** Hầu như không cache ở client vì giá và trạng thái PO cần mới. Chỉ cache dữ liệu ít đổi và luôn có cách vô hiệu hóa, như `useCache: false` sau khi reassign.
- **Khi nào không nên dùng `useMemo`?** Khi phép tính rẻ và không truyền xuống component đã `memo`. Nên đo bằng Profiler trước.
- **Bảng lớn thì sao?** Hiện phân trang server với mặc định 50 dòng nên chưa cần virtualization. Nếu phải hiển thị hàng nghìn dòng thì dùng `virtual` của Ant Design Table.
- **Làm sao biết đã tối ưu đúng?** Thành thật nói project chưa có số đo chuẩn, rồi nêu cách bạn sẽ đo: LCP/INP, Profiler, kích thước bundle.

---

## Bước tiếp theo nếu bạn đồng ý (không sửa source code)
Chạy `npx vite build --outDir <scratchpad>` để lấy kích thước bundle thật của từng chunk, build ra thư mục tạm và không đụng vào repo. Sau đó mình bổ sung số đo này vào câu trả lời.

**Kiểm tra:** chỉ dùng những con số do lệnh build trả về, và đối chiếu với output của build.
