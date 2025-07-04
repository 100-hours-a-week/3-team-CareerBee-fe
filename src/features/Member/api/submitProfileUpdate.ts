import { safePatch } from '@/src/shared/api/request';
import { toast } from '@/src/shared/model/useToast';

export const SubmitProfileUpdate = async ({
  nickname,
  profileUrl,
  setIsNicknameDirty,
  isProfileImageDirty,
  setIsProfileImageDirty,
  setHelperText,
  token,
}: {
  nickname?: string;
  profileUrl?: string | null;
  setIsNicknameDirty: (_value: boolean) => void;
  isProfileImageDirty: boolean;
  setIsProfileImageDirty: (_value: boolean) => void;
  setHelperText: (_value: string) => void;
  token: string | null;
}) => {
  if (!token) return;

  try {
    const body: Record<string, any> = {};
    body.newNickname = nickname;
    if (isProfileImageDirty) body.newProfileUrl = profileUrl;

    await safePatch('/api/v1/members', body, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast({ title: '저장 완료', variant: 'success' });
    setIsNicknameDirty(false);
    setIsProfileImageDirty(false);
  } catch (err: any) {
    setHelperText('');
    toast({ title: '정보 수정에 실패했습니다.', variant: 'destructive' });
  }
};
