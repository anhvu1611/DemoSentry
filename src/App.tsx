import React, { useState, useEffect } from 'react';
import * as Sentry from '@sentry/react';
import styled from 'styled-components';

// Dùng thể theo dõi hiệu suất render của component
const SentryRouteTracking = Sentry.withProfiler(
  ({ children }: { children: React.ReactNode }) => children,
  { name: 'MainAppComponent' }
);

function App() {
  const [showError, setShowError] = useState(false);

  // Theo dõi người dùng - Thường nên được thiết lập sau khi đăng nhập
  useEffect(() => {
    // Set user context cho Sentry
    Sentry.setUser({
      id: '12345',
      email: 'anhvune@gmail.com',
      username: 'anhvune',
    });

    // Thiết lập thẻ tags cho việc lọc sự kiện
    Sentry.setTag('page', 'Home');
    Sentry.setTag('version', '1.0.0');

    // Thiết lập context bổ sung
    Sentry.setContext('character', {
      name: 'Page Home',
      description: 'Trang chủ của ứng dụng',
    });

    // Tạo breadcrumb để theo dõi hành động
    // Sentry.addBreadcrumb({
    //   category: 'ui.click',
    //   message: 'User loaded the application',
    //   level: 'info',
    // });
  }, []);

  // Hàm tạo lỗi có chủ ý để test Sentry
  const causeError = () => {
    try {
      Sentry.captureMessage("Đã nhấn nút tạo lỗi (bắt và báo cáo)");
      // Tạo lỗi có chủ ý
      throw new Error('Handled error nè');
    } catch (error) {
      // Bắt và gửi lỗi tới Sentry
      Sentry.captureException(error);
      // Hiển thị thông báo cho người dùng
      alert('Đã gửi lỗi tới Sentry!');
    }
  };

  // Hàm tạo lỗi nghiêm trọng để test Error Boundary
  const causeFatalError = () => {
    Sentry.captureMessage("Đã nhấn nút tạo lỗi crash app");
    // alert('Đã gửi lỗi tới Sentry!');
    setShowError(true);
  };

  if (showError) {
    // Kích hoạt Error Boundary
    throw new Error('Kích hoạt Error Boundary nè!');
  }

  return (
    <SentryRouteTracking>
      <AppContainer>
        <AppHeader>
          <HeaderTitle>Sentry React Demo</HeaderTitle>
          <p>Test các tính năng của Sentry trong React</p>
        </AppHeader>
        
        <AppContent>
          <FeatureSection>
            <SectionTitle>Error Monitoring</SectionTitle>
            <ButtonGroup>
              <ActionButton onClick={causeError}>
                Tạo lỗi (bắt và báo cáo)
              </ActionButton>
              <ActionButton onClick={causeFatalError} variant="error">
                Tạo lỗi crash app
              </ActionButton>
            </ButtonGroup>
          </FeatureSection>
        </AppContent>
        
        <AppFooter>
          <p>
            Demo tích hợp Sentry trong React - Github: anhvu1611
          </p>
        </AppFooter>
      </AppContainer>
    </SentryRouteTracking>
  );
}

// Bọc ứng dụng trong ErrorBoundary của Sentry
export default function AppWithErrorBoundary() {
  return (
    <Sentry.ErrorBoundary fallback={({ resetError }) => (
      <div>
        <p>Có lỗi xảy ra!</p>
        <button onClick={resetError}>Thử lại</button>
      </div>
    )}>
      <App />
    </Sentry.ErrorBoundary>
  );
} 

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: #333;
`;

const AppHeader = styled.header`
  background-color: #2d3748;
  padding: 2rem;
  color: white;
  text-align: center;
`;

const HeaderTitle = styled.h1`
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
`;

const AppContent = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const FeatureSection = styled.section`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
  color: #4a5568;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.5rem 0;
`;

const ActionButton = styled.button<{ variant?: 'default' | 'error' | 'info' }>`
  background-color: ${props => {
    switch (props.variant) {
      case 'error': return '#f56565';
      case 'info': return '#68d391';
      default: return '#4299e1';
    }
  }};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => {
      switch (props.variant) {
        case 'error': return '#e53e3e';
        case 'info': return '#48bb78';
        default: return '#3182ce';
      }
    }};
  }
`;

const AppFooter = styled.footer`
  background-color: #f7fafc;
  padding: 1.5rem;
  text-align: center;
  border-top: 1px solid #edf2f7;

  a {
    color: #4299e1;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;