## Cài đặt

1. Clone repository:
```bash
git clone https://github.com/anhvu1611/DemoSentry.git
cd sentry-demo
```

2. Cài đặt các phụ thuộc:
```bash
npm install
```

3. Cấu hình Sentry DSN:
Thay thế DSN trong `src/index.tsx` với DSN của bạn từ trang dashboard Sentry.

```javascript
Sentry.init({
  dsn: "YOUR_DSN_HERE",
  // ...
});
```

4. Chạy ứng dụng:
```bash
npm start
```
