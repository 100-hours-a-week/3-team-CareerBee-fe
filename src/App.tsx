import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { useEffect } from 'react';
import { useNotificationSSE } from '@/features/Member/notification/hooks/useNotificationSSE';
import { useUserInfo } from '@/hooks/useUserInfo';

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
  const { data: userInfo } = useUserInfo();
  const isLoggedIn = !!userInfo;
  useNotificationSSE(isLoggedIn);

  return <RouterProvider router={router} />;
}

export default App;
