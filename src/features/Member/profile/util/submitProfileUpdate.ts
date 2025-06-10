import { safePatch } from '@/lib/request';
import { toast } from '@/hooks/useToast';

export const SubmitProfileUpdate = async ({
  file,
  nickname,
  profileUrl,
  onSuccess,
  onError,
  setIsProfileImageDirty,
  setHelperText,
  token,
}: {
  file: File | null;
  nickname?: string;
  profileUrl?: string;
  onSuccess?: () => void;
  onError?: () => void;
  setIsProfileImageDirty: (_value: boolean) => void;
  setHelperText: (_value: string) => void;
  token: string | null;
}) => {
  if (!token) return;

  try {
    const res = await safePatch(
      '/api/v1/members',
      {
        newProfileUrl: profileUrl,
        newNickname: nickname,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    if (res.httpStatusCode === 204) {
      toast({ title: '저장 완료', variant: 'success' });
      setIsProfileImageDirty(false);
      onSuccess?.();
    }
  } catch (err: any) {
    //TODO: 아마 여기서는 안 잡힐거임.... request에서 잡기 때문에...
    //request에서 잡아도 위로 throw할 수는 없을까???
    //아니면... 409의 경우만 catch에서 빼기???
    if (err.response?.status === 409) {
      setHelperText('이미 존재하는 이메일입니다.');
    } else {
      setHelperText('');
      toast({ title: '정보 수정에 실패했습니다.', variant: 'destructive' });
    }
    onError?.();
  }
};
