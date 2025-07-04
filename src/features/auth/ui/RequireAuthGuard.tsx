import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/src/entities/auth/model/auth';

export default function RequireAuthGuard() {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  const pathname = usePathname();

  if (pathname.startsWith('/my') && !token) {
    router.replace('/login-required');
    return null;
  }

  return null;
}
