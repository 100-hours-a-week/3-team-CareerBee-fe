import type { AxiosRequestConfig, AxiosError } from 'axios';
import { instance as axios } from '@/features/Member/auth/utils/axios';
import { toast } from '@/hooks/useToast';

// 공통 요청 핸들러
export const safeRequest = async <T = any>(config: AxiosRequestConfig): Promise<T | null> => {
  try {
    const res = await axios.request<T>(config);
    return res.data;
  } catch (error) {
    const status = (error as AxiosError)?.response?.status;
    let message = '알 수 없는 오류가 발생했습니다.';
    if (status === 400) message = '잘못된 요청입니다.';
    else if (status === 404) message = '찾을 수 없습니다.';
    else if (status === 409) message = '이미 처리된 요청입니다.';
    else if (status === 500) message = '내부 네트워크 오류입니다.';
    toast({ title: message });
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
