import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { useEffect } from 'react';
import { useAuthStore } from '@/features/Member/auth/store/auth';
// import { useGlobalErrorToast } from '@/hooks/useGlobalErrorToast';
// import { useViewportHeight } from './hooks/useViewportHeight';
// import { AnimatePresence } from 'motion/react';

function App() {
  // useGlobalErrorToast();
  //토큰 복원
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      useAuthStore.getState().setToken(token);
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
