# Ôn tập phỏng vấn Senior Developer (Tiếng Anh)

Mục tiêu: trả lời rõ ràng, đơn giản, đủ ý. Trình độ từ vựng: **B1–B2**.

---

## Phần 1 — Câu mở đầu (Introduction)

**Q: Tell me about yourself.**

> I'm a software engineer with more than eight years of experience. My main strength is frontend development with React and TypeScript, and I also build APIs with Go and Ruby on Rails. Recently, I worked on a purchase order system for the healthcare industry, where I built the React screens and the Go API. I focus on performance and clean code, and I'm now looking for a senior role where I can take more ownership of the system design.

**Từ vựng hữu ích (B1–B2):**
| Từ / cụm từ | Nghĩa | Level |
|---|---|---|
| experience | kinh nghiệm | B1 |
| ownership | trách nhiệm (làm từ đầu đến cuối) | B2 |
| take responsibility for | chịu trách nhiệm cho | B1 |
| healthcare industry | ngành y tế | B1 |

---

## Phần 2 — Kinh nghiệm & Leadership

**Q: Describe a project you led.**

> I led the performance improvement for our main dashboard. The page was slow with large tables. I split the code by route, normalized the state, and used memoization. I also set up a plan with the team, so everyone agreed on the priorities.

**Q: How do you mentor junior developers?**

> I do code reviews with clear comments. I explain the reason behind a decision, not only what to change. I also pair with them on difficult tasks.

**Q: Tell me about a conflict in your team.**

> We disagreed about how to structure the state. I listened to both sides, then we tested both options with a small prototype. We chose the simpler one, and the result was clear.

**Từ vựng:**
| Từ / cụm từ | Nghĩa | Level |
|---|---|---|
| lead a project | dẫn dắt dự án | B2 |
| prioritize | sắp xếp ưu tiên | B2 |
| mentor | hướng dẫn, kèm cặp | B2 |
| code review | review code | B1 |
| disagree | không đồng ý | B1 |
| trade-off | sự đánh đổi | B2 |

---

## Phần 3 — Kỹ thuật Frontend

**Q: How do you improve the performance of a React app?**

> First, I measure the problem. I use the React Profiler and Lighthouse. Then I apply some fixes: code splitting with `React.lazy`, memoization with `useMemo` and `React.memo`, and normalizing data in the store. I also avoid unnecessary re-renders by keeping references stable.

**Q: When do you use `useMemo` and when should you NOT use it?**

> `useMemo` has a small cost on every render. React compares the dependencies and keeps the cached value in memory. So I only use it when the calculation is expensive, like filtering or sorting a large list, or when I need a stable reference for a child component wrapped in `React.memo`. If the dependencies change on every render, `useMemo` does not help, so I don't use it. I check with the React Profiler first.

**Q: What is the difference between `useQuery` and `useLazyQuery` in RTK Query?**

> `useQuery` runs automatically when the component mounts. `useLazyQuery` runs only when I call the trigger function. I use lazy when the request depends on a user action.

**Q: How do you handle caching on the client?**

> It depends on how often the data changes. For data that changes often, like order status, I get fresh data, because old data can cause mistakes. For data that changes rarely, like buyers and vendors, I store it and reuse it, so the app is faster. When the user saves a change, I update or remove the cache, so the screen shows the right data. If I use RTK Query, I can use tags to refresh only the data that changed.

**Từ vựng B1 cho câu này:**

| Từ | Nghĩa | Ví dụ |
|---|---|---|
| store | lưu | I store the data in the cache. |
| reuse | dùng lại | I reuse the data when the user comes back. |
| fresh | mới | I need fresh data for order status. |
| old / outdated | cũ | Old data can cause mistakes. |
| update | cập nhật | I update the cache after a save. |
| remove | xóa | I remove the cache when data changes. |
| often / rarely | thường xuyên / hiếm khi | This data changes rarely. |

**Câu hỏi sâu hơn:**

**Q: How do you know when the cache is out of date?**

> We can set a time limit for the cache with `keepUnusedDataFor`. We can also fetch again when the component mounts or the arguments change. But the best way is to use tags. When the user changes a buyer, the related query is marked as old, so it fetches again.

> *Ví dụ:* Trang danh sách buyer dùng cache. Bạn vào trang sửa buyer "Nguyen A", đổi tên thành "Nguyen B", rồi bấm Save. Nếu danh sách buyer có tag `Buyer`, khi quay lại danh sách sẽ thấy "Nguyen B" ngay. Nếu không có tag, danh sách vẫn hiện "Nguyen A" cho đến khi reload trang.

**Q: What happens if two users edit the same order?**

> The cache on my screen only shows what I loaded. If another user changes the order, my data can be old. For important data, I refetch when the user focuses the window, or I check the server again before saving. I would also handle conflicts with a version number, so the server can reject an old update.

> *Ví dụ:* Anh A và chị B cùng mở PO số 1001. Lúc 9:00, anh A đổi trạng thái thành "Approved". Màn hình của chị B vẫn hiện "Pending" vì dữ liệu đã cũ. Khi chị B bấm Save, server so sánh version, thấy PO đã đổi, nên trả lỗi: "PO đã được cập nhật, vui lòng tải lại trang".

**Q: Why don't you cache order status for a long time?**

> Order status affects business decisions, like whether to pay an invoice. If the status is old, the user can make a wrong decision. So for this kind of data, a short cache or no cache is safer than a fast screen with wrong data.

> *Ví dụ:* Trạng thái PO trong cache là "Not received", nhưng thực tế hàng đã về kho. Kế toán thấy trạng thái cũ nên không thanh toán invoice đúng hạn. Nếu lấy trạng thái mới từ server, vấn đề này không xảy ra.

**Q: What if the API fails but you have cached data?**

> I can show the cached data with a message that says it may be old. I also retry the request. I do not hide the error, because the user needs to know the data may not be current.

> *Ví dụ:* Người dùng mở danh sách vendor lúc mạng yếu. API trả lỗi 500, nhưng danh sách đã có trong cache. Màn hình vẫn hiện danh sách cũ, kèm dòng chữ: "Dữ liệu có thể chưa mới nhất. Bấm Thử lại." Người dùng vẫn làm việc được, và biết dữ liệu có thể cũ.

**Q: How would you improve the cache in your current project?**

> First, I would use `useQuery` for buyer and vendor data, so RTK Query manages the cache, instead of copying the data into another slice. Second, I would add `providesTags` and `invalidatesTags`, so the cache is cleared only when the related data changes. Third, I would fix the `keepUnusedDataFor` setting, which is in the wrong place now. Then I would measure the number of API calls before and after the change.

> *Ví dụ:* Endpoint `getComments` trong `getPOManagementsAPI.ts` (dòng 186) đặt `keepUnusedDataFor: 0` bên trong hàm `query()`, nên RTK Query bỏ qua option này. Dữ liệu infinite scroll nằm trong slice `comments.slice.ts`, và hook `useFetchComments` dùng `useLazyGetCommentsQuery`. Hook này không đặt `preferCacheValue`, nên luôn gọi API. Vì vậy, đếm request trong Network không cho thấy khác biệt khi đổi option này.

> *Lưu ý:* Chưa xác nhận `keepUnusedDataFor: 0` là cách sửa bug infinite scroll. Trước khi nói trong phỏng vấn, cần tái hiện bug (ví dụ: scroll sang trang 2, đổi sang PO khác rồi quay lại, xem comment có bị trùng không) với và không có dòng `: 0`.

**Từ vựng:**
| Từ / cụm từ | Nghĩa | Level |
|---|---|---|
| bottleneck | điểm nghẽn | B2 |
| re-render | render lại | B1 |
| stable reference | tham chiếu ổn định | B2 |
| invalidate the cache | xóa / làm mất hiệu lực cache | B2 |
| trigger | kích hoạt | B2 |
| measure | đo lường | B1 |

---

### 3.1 Công cụ đo performance

**React Profiler** (trong React DevTools) cho biết component nào render và mất bao lâu.

**Lighthouse** (trong Chrome DevTools) chấm điểm performance của cả trang, với các chỉ số LCP, INP, CLS.

**Cách dùng React Profiler:**
1. Cài React DevTools, chạy app ở chế độ development.
2. Mở DevTools, chọn tab **Profiler**.
3. Bật **Record why each component rendered** trong settings.
4. Bấm **Record**, thao tác đúng luồng cần đo, rồi bấm **Stop**.
5. Xem flamegraph hoặc ranked chart, bấm vào component để xem **Why did this render?**.
6. Đo trước khi tối ưu, sửa, rồi đo lại để so sánh.

> I record a Profiler session while doing the slow action, then check the ranked chart. If a row component re-renders with the same props, I add React.memo and a stable callback, then record again to compare.

---

## Phần 4 — Backend & Fullstack

**Q: What do you know about REST API design?**

> I use clear resource names, like `/orders` and `/orders/:id`. I use HTTP methods correctly: GET to read, POST to create, PUT or PATCH to update, DELETE to remove. I also use pagination for large lists.

**Q: What is the difference between PUT and PATCH?**

> PUT replaces the whole resource. PATCH updates only some fields.

**Q: How do you handle errors in an API?**

> I return a clear status code, like 400 for bad input, 401 for not logged in, 403 for no permission, and 500 for server errors. The response body has a short message that the frontend can show to the user.

**Q: What is an event-driven architecture?**

> Services communicate by sending events instead of calling each other directly. For example, when a purchase order changes, the system publishes an event. Other parts of the system listen and react. This makes the system more loosely coupled.

**Từ vựng:**
| Từ / cụm từ | Nghĩa | Level |
|---|---|---|
| resource | tài nguyên (trong API) | B2 |
| pagination | phân trang | B2 |
| loosely coupled | ít phụ thuộc lẫn nhau | B2 |
| publish / subscribe | phát / đăng ký nhận | B2 |
| status code | mã trạng thái HTTP | B1 |

---

## Phần 5 — System Design (câu hỏi Senior hay gặp)

**Q: How would you design a system to show a large list of data?**

> First, I ask questions. How many records? Do users need search or filter? How fresh does the data need to be? Then I recommend: server-side pagination, an index for search, and a cache for data that changes rarely. On the frontend, I can use virtual scrolling for very long lists.

**Q: How do you make sure your code is reliable in production?**

> I write unit tests for the business logic and integration tests for the important flows. I use logging and monitoring, so I can find problems fast. I also use feature flags to release changes slowly.

**Q: Tell me about a time something went wrong in production.**

> [Kể một sự cố thật]. The problem was ___. I found the root cause by ___. To fix it, I ___. After that, I added ___ so it would not happen again.

> *Mẹo:* Dùng cấu trúc **STAR** — Situation, Task, Action, Result.

**Từ vựng:**
| Từ / cụm từ | Nghĩa | Level |
|---|---|---|
| scalability | khả năng mở rộng | B2 |
| trade-off | sự đánh đổi | B2 |
| root cause | nguyên nhân gốc | B2 |
| rollback | quay lại phiên bản cũ | B2 |
| monitoring | giám sát | B2 |
| feature flag | cờ bật/tắt tính năng | B2 |

---

## Phần 6 — Câu hỏi của bạn (hỏi lại nhà tuyển dụng)

Nên hỏi 2–3 câu để thể hiện bạn quan tâm:

- What does a typical week look like for this role?
- What are the biggest technical challenges the team faces right now?
- How does the team make decisions about architecture?
- How do you measure success for this position in the first 6 months?

---

## Phần 7 — Mẫu câu hữu ích khi trả lời

| Tình huống | Câu nói |
|---|---|
| Chưa hiểu câu hỏi | Could you please repeat the question? |
| Cần thời gian suy nghĩ | That's a good question. Let me think for a moment. |
| Không biết chắc | I'm not 100% sure, but I think... |
| Không biết làm | I haven't worked with that directly, but I would start by... |
| Muốn nói thêm ý | I'd also like to add that... |
| Chuyển ý | Going back to your earlier question... |
| Đồng ý một phần | I agree with you on that point. However, I think... |
| Kết thúc câu trả lời | So, that's how I would approach it. |

---

## Phần 8 — Vòng 1: Background & culture fit

Phần này lấy từ `interview-round-1.md`, đã sửa lỗi ngữ pháp và nói rõ hơn.

**Q: Tell me about yourself.**

> My name is Trung. I'm a software engineer with more than eight years of experience. My strongest area is frontend development with React and TypeScript. I also build APIs with Go and Ruby on Rails. Right now, I'm working on EDI Authority, a system that helps hospitals manage buying and paying for medical supplies.

**Q: Walk me through your resume.**

> In 2018, I worked on Market Intelligence. It helps hospitals find the best price from each vendor for one item. I used Ext JS, Ruby on Rails, and Elasticsearch. From 2019 to 2025, I worked on MIMS, a web application where hospitals and suppliers manage implant items, prices, and stock. I used React, Ruby on Rails, and Go. Since 2025, I have worked on EDI Authority. I built the React screens and the Go API.

**Q: Why are you looking for a new job?**

> I have learned a lot in my current job. Now I want a new workplace, a new field, and more chances to use English. So far, I have only worked in the healthcare domain. At my current company, engineers don't use English very often. I mainly use it in client demos and technical discussions.

**Q: Why do you want this job?**

> The role matches my experience. I have built React screens and backend APIs for real users. I also like how the company supports career growth with a clear, step-by-step roadmap for everyone. And I like the slogan "Better systems, better world."

**Q: What are you good at?**

> My main strength is frontend work. I build user interfaces, improve user experience, and write React with TypeScript. I can also take backend tasks when the team needs help. When a requirement is unclear, I ask early. I try to write code that is easy to read and maintain. I take responsibility and communicate clearly with the team.

**Q: What is a weak point?**

> I have two weak points. First, I find it harder to focus when I work from home, because it can be noisy. So I prefer working in the office or in a hybrid setup. Second, I sometimes stutter when I feel stressed or excited. I have practiced a lot, and I can usually control it. When it happens, I slow down and take a short pause.

> *Lưu ý:* điểm thứ hai là thông tin cá nhân, bạn không bắt buộc phải nói.

**Thêm các cách trả lời (chọn 1–2 câu phù hợp với bạn):**

> **Ý 1 — Hay lo lắng về chi tiết:** I sometimes spend too much time on details. Now I set a time limit for each task, and I focus on the main goal first.

> **Ý 2 — Khó nói "không":** I sometimes say yes to too many tasks. Now I check the priority with my manager before I accept new work.

> **Ý 3 — Muốn hoàn hảo:** I want my code to be perfect. Now I focus on what is good enough for the release, and I improve it later.

> **Ý 4 — Chưa quen tiếng Anh nói nhanh:** I need a little time to understand fast English. I ask people to speak slowly, and I write down key words during meetings.

> **Ý 5 — Ít nói trong nhóm lớn:** In big meetings, I sometimes wait too long before I speak. Now I prepare my main point before the meeting.

**Từ vựng dễ (B1):**

| Từ | Nghĩa | Ví dụ ngắn |
|---|---|---|
| weakness | điểm yếu | My weakness is... |
| focus | tập trung | I find it hard to focus. |
| detail | chi tiết | I care a lot about details. |
| priority | ưu tiên | Let me check the priority. |
| perfect | hoàn hảo | I want my work to be perfect. |
| improve | cải thiện | I want to improve my English. |
| quiet | ít nói, yên lặng | I am quiet in big meetings. |

**Q: Tell me about your current project.**

> I work on EDI Authority. It helps hospitals manage buying and paying for medical supplies. You can think of it as a checker between the hospital and its suppliers. When a supplier sends an order or an invoice, the system checks if the prices, quantities, and items match the contract. If everything is correct, it goes through automatically. If something looks wrong, a person reviews it. This helps hospitals avoid paying too much.

> *Bản ngắn, khi họ hỏi tiếp về kỹ thuật:* A hospital sends an order, and a supplier sends a reply. My screen shows the differences in price, quantity, unit, and item number, so the buyer can decide what to do. The frontend is React, the API is Go, Kafka moves the files, and OpenSearch handles search.

**Q: How do you work with other people?**

> I work in an Agile Scrum team with business analysts, testers, and other developers. In each sprint, we agree on the requirements first. Then I estimate the work. When I finish, I show the result and ask for feedback. I like working in a close team where we share ideas and build solutions together.

**Q: Tell me about a problem at work.**

> After one release, the search results looked wrong. I checked the sync job and the API. Then I compared the database with the search data. I fixed the bad data and checked the result again. After the next release, I also watched the job closely. The wrong results affected about [X] users, and after the fix, the error rate dropped to [Y].

> *Lưu ý:* điền số liệu thật. Câu trả lời có kết quả đo được nghe thuyết phục hơn.

**Q: Tell me about a mistake.**

> Early in one task, I started coding before the rule was clear. Later, we had to change the screen. Now I write a short note first. It says what we will change and which files we will touch. I ask someone to confirm it, and then I start coding.

**Q: How do you use AI?**

> I use Cursor and Claude Code. AI helps me write a first draft of the design, the code, and the review. But I read everything and make the decision. If the answer is wrong, I don't use it. I always check the result before I accept it.

**Q: How is your English?**

> I can talk about my work in simple English. Sometimes I need people to speak more slowly, or I ask them to repeat. I can read documents and write short updates. I want to use English every day so I can improve.

**Q: When can you start?**

> My notice period is about one month. I will try to start earlier if the company needs me. I can confirm the exact date after I talk with my manager.

> *Lưu ý:* thay "one month" bằng thời gian báo trước thật trong hợp đồng hiện tại. Chỉ nói một con số.

**Q: What salary do you expect?**

> I'm open to a fair offer for this role and my experience. Could you tell me the salary range for this position?

> *Lưu ý:* chỉ nói một con số khi họ hỏi lại lần hai. Chuẩn bị sẵn một con số trước buổi phỏng vấn.

**Q: Do you have any questions for us?**

> Yes, I have a few questions:
> - What does the team expect from me in the first three months?
> - How is the team organized, and who will I work with every day?
> - How would you describe the company culture?
> - What kind of task or project would I work on first?
> - How often does the team use English at work?
> - What is the biggest challenge the team is working on now?
> - In the work sample, what do you want to see: clean code, a working feature, or both?
> - Will the second interview be about my work sample?

**Cách nói khi bí từ:**
- I am sorry. Can you say that more slowly?
- Let me think for a few seconds.
- I understand the question. Here is a short answer.
- I do not know that word. Can you explain it?

### 8.1 Câu hỏi bổ sung cho vị trí Senior

**Q: Tell me about a time you disagreed with your manager.**

> In a sprint planning, my manager wanted to release a feature quickly. I was worried about the performance risk. I showed some numbers from a test. We agreed to release a smaller version first and measure the result.

**Q: How do you handle a tight deadline?**

> I first check which parts are really needed for the release. I talk to the product owner about priorities. I also say early if there is a risk, so the team can plan again. I do not hide problems until the last day.

**Q: What would you do in your first 90 days?**

> In the first month, I would learn the codebase, the business rules, and the team process. In the next two months, I would take small tasks, do code reviews, and find the main technical risks. After 90 days, I would suggest improvements based on what I learned.

**Q: What is a technical decision you would make differently now?**

> In one project, I used a complex state structure too early. Later, it made the code harder to change. Now I start with a simpler design, and I add complexity only when the problem is clear.

### 8.2 Từ vựng thêm (B1–B2)

| Từ / cụm từ | Nghĩa | Level |
|---|---|---|
| notice period | thời gian báo trước khi nghỉ việc | B2 |
| culture fit | phù hợp với văn hóa công ty | B2 |
| hand over | bàn giao công việc | B2 |
| background check | kiểm tra lý lịch | B2 |
| step-by-step | từng bước | B1 |
| sprint planning | họp lập kế hoạch sprint | B2 |
| hybrid setup | làm việc kết hợp văn phòng và nhà | B2 |
| push back | phản đối, không đồng ý | B2 |

---

## Checklist trước phỏng vấn

- [ ] Luyện nói 5 câu mở đầu (Tell me about yourself, project, conflict, failure, why this company)
- [ ] Chuẩn bị 2 ví dụ dùng STAR cho leadership và sự cố production
- [ ] Ôn lại 5 câu System Design (Phần 5)
- [ ] Luyện nói to, ghi âm 1 câu trả lời rồi nghe lại
- [ ] Chuẩn bị 3 câu hỏi cho nhà tuyển dụng
