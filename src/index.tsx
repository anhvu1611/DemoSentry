import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import App from './App';
import './index.css';

// Khởi tạo Sentry với tất cả các tính năng
Sentry.init({
  dsn: "https://cdb17b41f94b91b9d4fe757352dd2cbc@o4509022008639488.ingest.us.sentry.io/4509022010605568", // Thay thế bằng DSN của bạn từ dashboard Sentry
  integrations: [
    Sentry.feedbackIntegration({
      id: 'feedback',
      colorScheme: "system",
      isNameRequired: true,
    }),
  ],
  // Cấu hình Performance Monitoring
  tracesSampleRate: 1.0, // Tỉ lệ mẫu - 1.0 có nghĩa là 100%
  // Cấu hình Session Replay
  replaysSessionSampleRate: 0.1, // Lấy mẫu 10% phiên người dùng
  replaysOnErrorSampleRate: 1.0, // Lấy mẫu 100% phiên lỗi

  beforeSend(event) {
    // Kiểm soát dữ liệu gửi đi
    return event;
  },

  // Thêm thông tin về môi trường
  environment: process.env.NODE_ENV,
  
  // Theo dõi dữ liệu người dùng (nếu có)
  initialScope: {
    user: { id: "anonymous" },
    tags: { app: "sentry-demo" }
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 