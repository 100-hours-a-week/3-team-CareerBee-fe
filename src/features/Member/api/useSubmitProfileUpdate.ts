'use client';

import { useDirty } from '@/src/features/member/model/isDirtyContext';
import { safePatch } from '@/src/shared/api/request';
import { toast } from '@/src/shared/model/useToast';
import { useAuthStore } from '@/src/entities/auth/model/auth';

export const useSubmitProfileUpdate = () =>{
  const {
    setIsNicknameDirty,
    isProfileImageDirty,
    setIsProfileImageDirty,
  } = useDirty();

  const token = useAuthStore((state) => state.token);
  
 const submit = async ({
    nickname,
    profileUrl,
    setHelperText,
  }: {
    nickname?: string;
    profileUrl?: string | null;
    setHelperText: (_value: string) => void;
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
  return { submit };
}