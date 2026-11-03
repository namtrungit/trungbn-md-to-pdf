# Cache & Performance trong React

> Tài liệu ôn tập phỏng vấn và tham khảo thực chiến.  
> Nguyên tắc xuyên suốt: **đo trước, tối ưu sau**.

---

## 1. Mental Model — 3 tầng tối ưu

```
User Request
     │
     ▼
[1] BUNDLE        → React.lazy, code splitting, tree shaking
     │
     ▼
[2] NETWORK/DATA  → HTTP cache, RTK Query cache, pagination, abort
     │
     ▼
[3] RENDER        → React.memo, useMemo, useCallback, virtualization
```

Mỗi tầng giải quyết vấn đề khác nhau. Sai tầng → tối ưu không có tác dụng.

---

## 2. Tối ưu Render (React-level)

### 2.1 React.memo

Ngăn component con re-render khi props không thay đổi (shallow compare).

```tsx
// ❌ Không memo → re-render mỗi khi parent render
const Row = ({ item }: { item: Item }) => <div>{item.name}</div>;

// ✅ Memo → skip re-render nếu item reference không đổi
const Row = React.memo(({ item }: { item: Item }) => <div>{item.name}</div>);
```

**Khi nào dùng:** component con nặng, nhận props ổn định, parent re-render thường xuyên.  
**Khi nào KHÔNG dùng:** component đơn giản, props luôn thay đổi → overhead của memo > lợi.

---

### 2.2 useMemo — giữ ổn định reference của derived data

```tsx
// ❌ Bẫy phổ biến: .map() trong JSX tạo mảng mới mỗi render
// → memo(Row) vô nghĩa vì data luôn là reference mới
<Table data={ids.map(id => entities[id])} />

// ✅ Memo hoá mảng → Table chỉ re-render khi ids hoặc entities đổi
const data = useMemo(
  () => ids.map(id => entities[id]),
  [ids, entities]
);
<Table data={data} />
```

**Dùng useMemo khi:**
- Kết quả được truyền vào `memo` component
- Phép tính nặng (sort/filter list lớn, transform data phức tạp)
- Object/array dùng làm dependency của hook khác

**KHÔNG dùng khi:** phép tính rẻ, không ảnh hưởng re-render con.

---

### 2.3 useCallback — giữ ổn định reference của function

```tsx
// ❌ Mỗi render tạo function mới → memo(Button) luôn re-render
const handleClick = () => fetchData(id);

// ✅ Function ổn định → memo(Button) hoạt động đúng
const handleClick = useCallback(() => fetchData(id), [id, fetchData]);
```

**Rule:** chỉ cần `useCallback` khi function được truyền vào `memo` component hoặc là dependency của `useEffect`/`useMemo`.

---

### 2.4 Tránh bẫy re-render thường gặp

| Bẫy | Nguyên nhân | Cách sửa |
|---|---|---|
| Object literal trong JSX | `<Comp style={{ color: 'red' }} />` tạo object mới | `useMemo` hoặc khai báo ngoài component |
| Inline arrow function | `onClick={() => fn(id)}` reference mới mỗi render | `useCallback` |
| Context value là object | `<Ctx.Provider value={{ a, b }}>` | `useMemo` cho value |
| Selector trả về object mới | `useSelector(s => ({ a: s.a, b: s.b }))` | Tách 2 selector, hoặc dùng `createSelector` |

---

### 2.5 createSelector (Reselect)

Memoize selector để tránh re-render khi dữ liệu không thực sự thay đổi.

```ts
import { createSelector } from '@reduxjs/toolkit';

// Mỗi lần selector được gọi với cùng input → trả về cùng reference
const selectActiveItems = createSelector(
  (state: RootState) => state.items.ids,
  (state: RootState) => state.items.entities,
  (ids, entities) => ids.map(id => entities[id]).filter(Boolean)
);
```

---

### 2.6 Virtualized List

Khi danh sách có hàng nghìn dòng, chỉ render những gì đang hiển thị.

```tsx
import { FixedSizeList } from 'react-window';

<FixedSizeList height={600} itemCount={10000} itemSize={50} width="100%">
  {({ index, style }) => (
    <div style={style}>{items[index].name}</div>
  )}
</FixedSizeList>
```

Ant Design 5 cũng hỗ trợ `virtual` prop trên Table:
```tsx
<Table virtual scroll={{ y: 600 }} dataSource={bigList} columns={columns} />
```

---

## 3. Code Splitting & Bundle Optimization

### 3.1 Route-based code splitting

```tsx
// Vite tự tách chunk cho mỗi lazy import
const DashboardPage = lazy(() => import('@features/DashboardPage'));
const PODetailsPage = lazy(() => import('@features/PurchaseOrder/pages/PODetailsPage'));

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/po/:id" element={<PODetailsPage />} />
      </Routes>
    </Suspense>
  );
}
```

**Kết quả:** user chỉ tải JS của trang họ đang xem, không phải toàn bộ app.

---

### 3.2 Manual chunks với Vite

Tách vendor libraries thành chunk riêng → browser cache lâu hơn (không bị invalidate khi app code thay đổi).

```ts
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: (id) => {
        if (id.includes('node_modules')) {
          if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
          if (id.includes('antd') || id.includes('@ant-design')) return 'vendor-antd';
          if (id.includes('@reduxjs') || id.includes('react-redux')) return 'vendor-redux';
          return 'vendor';
        }
        // Tách theo feature
        const match = id.match(/\/features\/([^/]+)/);
        if (match) return `feature-${match[1]}`;
      }
    }
  }
}
```

⚠️ **Cẩn thận:** manual chunks sai thứ tự load có thể gây lỗi runtime (`X is not a function`). Luôn test kỹ build production.

---

### 3.3 Tree shaking

Import named thay vì default để bundler loại bỏ code không dùng:

```ts
// ❌ Import cả antd (rất nặng)
import antd from 'antd';

// ✅ Import named → tree-shakeable
import { Button, Table } from 'antd';
```

---

## 4. Caching dữ liệu (Network/Data-level)

### 4.1 RTK Query cache

RTK Query có built-in cache theo argument của query.

```ts
// Khai báo endpoint
const api = createApi({
  endpoints: (builder) => ({
    getVendors: builder.query<Vendor[], void>({
      query: () => '/api/v1/vendors',
      keepUnusedDataFor: 300, // giữ cache 5 phút sau khi component unmount
      providesTags: ['Vendor'],
    }),
    updateVendor: builder.mutation({
      query: (body) => ({ url: '/api/v1/vendors', method: 'PATCH', body }),
      invalidatesTags: ['Vendor'], // tự động refetch vendor list sau update
    }),
  }),
});
```

**Các option quan trọng:**

| Option | Mặc định | Ý nghĩa |
|---|---|---|
| `keepUnusedDataFor` | 60s | Giữ cache bao lâu sau unmount |
| `providesTags` | — | Đánh tag cho cache entry |
| `invalidatesTags` | — | Xoá cache có tag này khi mutation thành công |
| `refetchOnMountOrArgChange` | false | Luôn fetch lại khi mount |

**Bẫy phổ biến:**
```ts
// ❌ keepUnusedDataFor trong query body KHÔNG CÓ TÁC DỤNG
getComments: builder.query({
  query: (params) => ({
    url: '/api/comments',
    keepUnusedDataFor: 0,  // ← sai chỗ, bị ignore
  }),
}),

// ✅ Phải đặt ở cấp endpoint
getComments: builder.query({
  query: (params) => '/api/comments',
  keepUnusedDataFor: 0,  // ← đúng chỗ
}),
```

---

### 4.2 useLazyQuery vs useQuery

```ts
// useQuery: fetch ngay khi component mount
const { data } = useGetProfileQuery();

// useLazyQuery: fetch theo trigger (khi user action, scroll, etc.)
const [getVendors, { data, isFetching }] = useLazyGetVendorsQuery();

// Dùng preferCacheValue để tái sử dụng cache nếu đã có
await getVendors(params, /* preferCacheValue= */ true);
```

---

### 4.3 Custom cache với Map

Khi RTK Query không đủ linh hoạt (ví dụ: cache per row id, không per query arg):

```ts
const useFetchAssigneesForLine = () => {
  const [getAssignees] = useLazyGetAssigneesQuery();
  
  // Cache: Map<lineId, Assignee[]>
  const [cacheById, setCacheById] = useState<Map<number, Assignee[]>>(new Map());
  // Loading: Set<lineId> để chặn gọi song song cùng id
  const [loadingIds, setLoadingIds] = useState<Set<number>>(new Set());

  const fetch = useCallback(async (id: number, useCache = true) => {
    // 1. Kiểm tra cache
    if (useCache && cacheById.has(id)) return;
    
    // 2. Kiểm tra đang loading
    let shouldFetch = false;
    setLoadingIds(prev => {
      if (prev.has(id)) return prev; // đã đang load
      shouldFetch = true;
      return new Set(prev).add(id);
    });
    if (!shouldFetch) return;

    try {
      const data = await getAssignees({ id }).unwrap();
      setCacheById(prev => new Map(prev).set(id, data));
    } finally {
      setLoadingIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }, [getAssignees]);

  return { fetch, getById: (id: number) => cacheById.get(id) ?? [] };
};
```

---

### 4.4 Normalize state với createEntityAdapter

```ts
// ❌ Mảng phẳng → update O(n)
state.items = items.map(i => i.id === id ? { ...i, ...changes } : i);

// ✅ Normalized → update O(1)
const adapter = createEntityAdapter<Item>();
// state: { ids: [1, 2, 3], entities: { 1: {...}, 2: {...} } }

const slice = createSlice({
  name: 'items',
  initialState: adapter.getInitialState(),
  reducers: {
    setAll: adapter.setAll,       // replace all
    updateOne: adapter.updateOne, // O(1) update
    removeOne: adapter.removeOne,
  },
});

// Component: tránh mapping lại nếu reference không đổi
const data = useMemo(
  () => ids.map(id => entities[id]),
  [ids, entities]
);
```

---

## 5. HTTP Cache & Browser Cache

### 5.1 Chiến lược theo loại file

| File | Header | Lý do |
|---|---|---|
| `/assets/*.js`, `/assets/*.css` | `Cache-Control: public, max-age=31536000, immutable` | Vite hash filename → URL đổi khi content đổi |
| `index.html` | `Cache-Control: no-cache` | Phải luôn kiểm tra version mới |
| API responses | Tuỳ nghiệp vụ | Dữ liệu mới vs master data |

```nginx
# Nginx config đúng
location / {
    try_files $uri $uri/ /index.html;
    # index.html: không cache
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}

location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable, no-transform";
}
```

### 5.2 Gzip compression

```nginx
gzip on;
gzip_vary on;
gzip_types text/javascript application/javascript text/css application/json;
gzip_min_length 10240;
```

---

## 6. Chiến lược tải dữ liệu

### 6.1 Server-side pagination

```ts
// Chỉ lấy 50 dòng / trang thay vì toàn bộ
const payload = {
  pagination: { page: 1, page_size: 50 },
  filters: { ... }
};
```

### 6.2 Infinite scroll

```tsx
import InfiniteScroll from 'react-infinite-scroll-component';

<InfiniteScroll
  dataLength={comments.length}
  next={() => loadMore({ page: currentPage + 1, page_size: 20 })}
  hasMore={comments.length < total}
  loader={<Spin />}
>
  {comments.map(c => <CommentItem key={c.id} comment={c} />)}
</InfiniteScroll>
```

### 6.3 Parallel loading với Promise.all

```ts
// ✅ Load song song, không nối tiếp
await Promise.all([
  fetchBuyers(),
  fetchVendors(),
  fetchCorporations(),
]);
setInitSuccess(true);
```

### 6.4 Abort request cũ

```ts
useEffect(() => {
  const controller = new AbortController();
  
  fetch('/api/data', { signal: controller.signal })
    .then(r => r.json())
    .then(setData);

  return () => controller.abort(); // huỷ khi dependency thay đổi
}, [filter]);
```

RTK Query tự xử lý abort khi dùng `useLazyQuery` + trigger mới.

### 6.5 Auto-refresh với setInterval

```ts
useEffect(() => {
  if (!refreshInterval || refreshInterval <= 0) return;
  
  const id = setInterval(() => {
    setRefresh(n => n + 1); // trigger re-fetch
  }, refreshInterval * 1000);
  
  return () => clearInterval(id);
}, [refreshInterval]);
```

---

## 7. Đo lường hiệu năng

### 7.1 React Profiler

```tsx
import { Profiler } from 'react';

<Profiler
  id="POTable"
  onRender={(id, phase, actualDuration) => {
    console.log(`${id} [${phase}]: ${actualDuration.toFixed(2)}ms`);
  }}
>
  <POTable data={data} />
</Profiler>
```

### 7.2 web-vitals

```ts
import { onLCP, onINP, onCLS } from 'web-vitals';

onLCP(console.log);  // Largest Contentful Paint < 2.5s
onINP(console.log);  // Interaction to Next Paint < 200ms
onCLS(console.log);  // Cumulative Layout Shift < 0.1
```

### 7.3 Bundle analyzer

```bash
# Xem kích thước từng chunk
npx vite-bundle-analyzer
# hoặc
npx rollup-plugin-visualizer
```

---

## 8. Bảng tóm tắt phỏng vấn

| Kỹ thuật | Giải quyết vấn đề | Trade-off | Khi KHÔNG dùng |
|---|---|---|---|
| `React.memo` | Re-render không cần thiết | So sánh props có chi phí | Props thay đổi liên tục |
| `useMemo` | Reference không ổn định, phép tính nặng | Tốn memory, code phức tạp hơn | Phép tính rẻ |
| `useCallback` | Function reference không ổn định | Như useMemo | Không truyền vào memo component |
| `createEntityAdapter` | Update array O(n) | Code phức tạp hơn | List nhỏ, ít update |
| `createSelector` | Selector tạo object mới mỗi lần | Cần cài thêm reselect | Selector đơn giản không derive data |
| `React.lazy` | Bundle quá lớn | Cần Suspense, UX loading | Component nhỏ, luôn cần ngay |
| `manualChunks` | Vendor chunk bị invalidate theo app | Dễ gây lỗi thứ tự load | Khi chưa đo bundle size |
| RTK Query cache | Gọi API trùng lặp | Phải quản lý tag invalidation | Data luôn cần fresh |
| Virtualized list | Render hàng ngàn DOM node | Hạn chế CSS, phức tạp hơn | List < vài trăm dòng |
| Pagination | Tải toàn bộ data | UX phải click next page | Dataset nhỏ |
| Infinite scroll | UX mượt hơn pagination | Khó implement đúng | Cần điều hướng nhanh |
| `AbortController` | Request cũ trả về sau request mới | Cần cleanup | Request ít khi bị cancel |
| Gzip | File JS/CSS quá lớn qua mạng | CPU server tăng nhẹ | File đã nhỏ < 1KB |
| HTTP long cache | Tải lại static assets mỗi lần | Cần hash filename | File thay đổi nhiều |

---

## 9. Checklist trước khi ship

- [ ] Đã đo LCP, INP, CLS chưa?
- [x] Bundle size có chunk nào > 500KB không?
- [ ] `index.html` có `no-cache` không?
- [ ] Static assets có hash filename và `immutable` không?
- [ ] Selector nào tạo object/array mới mỗi lần không?
- [ ] Có `.map()` inline trong JSX truyền vào `memo` component không?
- [ ] API nào gọi trùng lặp mà có thể cache không?
- [ ] List nào > 500 dòng chưa virtualize không?

---

*Ghi chú: Mọi ví dụ code dựa trên React 19, TypeScript, RTK Query, Vite 6.*
