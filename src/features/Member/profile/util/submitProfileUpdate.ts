import { safePatch } from '@/lib/request';
import { toast } from '@/hooks/useToast';

export const SubmitProfileUpdate = async ({
  nickname,
  profileUrl,
  onSuccess,
  onError,
  setIsNicknameDirty,
  setIsProfileImageDirty,
  setHelperText,
  token,
  // isNicknameDirty,
  // isProfileImageDirty,
}: {
  nickname?: string;
  profileUrl?: string;
  onSuccess?: () => void;
  onError?: () => void;
  setIsNicknameDirty: (_value: boolean) => void;
  setIsProfileImageDirty: (_value: boolean) => void;
  setHelperText: (_value: string) => void;
  token: string | null;
  isNicknameDirty: boolean;
  isProfileImageDirty: boolean;
}) => {
  if (!token) return;

  try {
    const body: Record<string, any> = {};
    // if (isNicknameDirty)
    body.newNickname = nickname;
    // if (isProfileImageDirty)
    body.newProfileUrl = profileUrl;

    await safePatch('/api/v1/members', body, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast({ title: '저장 완료', variant: 'success' });
    setIsNicknameDirty(false);
    setIsProfileImageDirty(false);
    onSuccess?.();
  } catch (err: any) {
    //TODO: 아마 여기서는 안 잡힐거임.... request에서 잡기 때문에...
    //request에서 잡아도 위로 throw할 수는 없을까???
    //아니면... 409의 경우만 catch에서 빼기???
    if (err.response?.status === 409) {
      setHelperText('이미 존재하는 변경값입니다.');
    } else {
      setHelperText('');
      toast({ title: '정보 수정에 실패했습니다.', variant: 'destructive' });
    }
    onError?.();
  }
};
