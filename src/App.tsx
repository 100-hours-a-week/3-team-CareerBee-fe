import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { useEffect } from 'react';
import { useAuthStore } from '@/features/Member/auth/store/auth';

function App() {
  //토큰 초기화
  useEffect(() => {
    const raw = localStorage.getItem('auth-storage');
    const token = raw ? JSON.parse(raw).state.token : null;
    if (token) {
      useAuthStore.getState().clearToken?.();
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
