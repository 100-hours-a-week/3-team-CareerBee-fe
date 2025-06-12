import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/features/Member/auth/store/auth';

export default function RequireMyAuth() {
  const token = useAuthStore((state) => state.token);
  const location = useLocation();

  if (location.pathname.startsWith('/my') && !token) {
    return <Navigate to="/login-required" replace />;
  }

  return <Outlet />;
}
