import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { useEffect, useState } from 'react';
import { useNotificationSSE } from '@/features/Member/notification/hooks/useNotificationSSE';
import { useAuthStore } from './features/Member/auth/store/auth';

function setViewportHeightVar() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

function App() {
  // viewport height 적용
  useEffect(() => {
    setViewportHeightVar();
    window.addEventListener('resize', setViewportHeightVar);
    window.addEventListener('orientationchange', setViewportHeightVar);
    return () => {
      window.removeEventListener('resize', setViewportHeightVar);
      window.removeEventListener('orientationchange', setViewportHeightVar);
    };
  }, []);

  // SSE 연결
  const token = useAuthStore.getState().token;
  useNotificationSSE(!!token); // ✅ 항상 호출하되, 실행 여부는 내부에서 결정

  return <RouterProvider router={router} />;
}

export default App;
