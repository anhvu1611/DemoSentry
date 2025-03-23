# Sentry React Demo

Ứng dụng demo React minh họa cách tích hợp và sử dụng đầy đủ các tính năng của [Sentry](https://sentry.io), bao gồm:

- **Error Monitoring**: Theo dõi và gửi báo cáo lỗi
- **Performance Monitoring**: Theo dõi hiệu suất ứng dụng
- **Session Replay**: Ghi lại phiên làm việc của người dùng

## Các tính năng Demo

Dự án này minh họa các khả năng của Sentry:

1. **Theo dõi và báo cáo lỗi**
   - Theo dõi lỗi tự động
   - Bắt lỗi thủ công
   - Sử dụng ErrorBoundary để xử lý lỗi React
   - Tùy chỉnh thông tin context

2. **Theo dõi hiệu suất**
   - Transactions và Spans
   - Theo dõi tính toán nặng
   - Theo dõi API requests
   - Profiling các components

3. **Session Replay**
   - Ghi lại tương tác người dùng
   - Theo dõi breadcrumbs
   - Hiển thị hành vi người dùng

4. **Tính năng bổ sung**
   - User feedback
   - Custom contexts và tags
   - Tích hợp với UI components

## Cài đặt

1. Clone repository:
```bash
git clone https://github.com/yourusername/sentry-demo.git
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

## Hướng dẫn sử dụng

Sau khi chạy ứng dụng, bạn sẽ thấy giao diện với ba phần chính:

- **Error Monitoring**: Thử tạo lỗi và xem cách Sentry bắt và báo cáo chúng
- **Performance Monitoring**: Thử nghiệm các tính năng theo dõi hiệu suất
- **Session Replay & User Interaction**: Tương tác với ứng dụng để xem Session Replay hoạt động

## Lưu ý

- Dự án này chỉ dùng cho mục đích demo. Trong môi trường thực tế, bạn nên điều chỉnh các tỉ lệ sampling để tránh chi phí cao.
- Thay thế DSN với DSN thực từ dự án Sentry của bạn trước khi triển khai.
- Có thể tùy chỉnh các cài đặt privacy cho Session Replay trong `src/index.tsx`.

## Tài nguyên

- [Sentry Documentation](https://docs.sentry.io/)
- [React SDK Documentation](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Performance Monitoring](https://docs.sentry.io/product/performance/)
- [Session Replay](https://docs.sentry.io/product/session-replay/) 