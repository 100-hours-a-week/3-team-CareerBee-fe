import type { AxiosRequestConfig, AxiosError } from 'axios';
import { instance as axios } from '@/features/Member/auth/utils/axios';
import { toast } from '@/hooks/useToast';

// 공통 요청 핸들러
export const safeRequest = async <T = any>(config: AxiosRequestConfig): Promise<T | null> => {
  try {
    const authHeader = config.headers?.Authorization;
    if (authHeader && typeof authHeader === 'string') {
      const token = authHeader.split(' ')[1];
      if (!token) {
        console.warn('❗ 인증 토큰이 없는 상태에서 요청이 시도되었습니다.');
        return null;
      }
    }
    const res = await axios.request<T>(config);
    return res.data;
  } catch (error) {
    const status = (error as AxiosError)?.response?.status;
    if (status) {
      if ([400, 404, 409, 500].includes(status)) {
        const messages: Record<number, string> = {
          400: '잘못된 요청입니다.',
          404: '찾을 수 없습니다.',
          409: '이미 처리된 요청입니다.',
          500: '내부 네트워크 오류입니다.',
        };
        toast({ title: messages[status] });
      } else {
        console.error('🚨 알 수 없는 오류입니다.', error);
      }
    }
    return null;
  }
};

// GET 요청용
export const safeGet = async <T = any>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T | null> => {
  return safeRequest<T>({ method: 'GET', url, ...config });
};

// POST 요청용
export const safePost = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T | null> => {
  return safeRequest<T>({ method: 'POST', url, data, ...config });
};
