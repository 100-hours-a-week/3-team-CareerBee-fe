'use client';

import { Button } from '@/src/widgets/ui/button';

import ProfileImageInput from '@/src/features/member/ui/profileImageInput';
import NicknameInput from '@/src/features/member/ui/nicknameInput';

import { SubmitProfileUpdate } from '@/src/features/member/api/submitProfileUpdate';
import { useDirty } from '@/src/features/member/model/isDirtyContext';

import { handlePresignedUrl } from '@/src/shared/api/handlePresignedUrl';
import { useUserInfo } from '@/src/features/member/model/useUserInfo';
import { useAuthStore } from '@/src/entities/auth/model/auth';

import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const ProfileUpdate = () => {
  const { data: userInfo } = useUserInfo();

  const [nickname, setNickname] = useState(userInfo?.nickname ?? '');
  const email = userInfo?.email ?? 'test@example.com';
  const [file, setFile] = useState<File | null>(null);

  const [helperText, setHelperText] = useState('');
  const {
    isNicknameDirty,
    setIsNicknameDirty,
    isProfileImageDirty,
    setIsProfileImageDirty,
    isAnyDirty,
  } = useDirty();

  useEffect(() => {
    const originalNickname = userInfo?.nickname ?? '닉네임';
    setIsNicknameDirty(nickname !== originalNickname && nickname != '');
  }, [nickname, userInfo]);

  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['userInfo'] });
  }, []);

  useEffect(() => {
    if (userInfo?.nickname) {
      setNickname(userInfo.nickname);
    }
  }, [userInfo?.nickname]);

  useEffect(() => {
    if (nickname == '') {
      setHelperText('*닉네임을 입력해주세요.');
    }
    if (isAnyDirty) {
      setHelperText('*저장하기를 눌러주세요.');
    } else {
      setHelperText('');
    }
  }, [isAnyDirty]);

  const token = useAuthStore((state) => state.token);
  return (
    <div className="flex flex-col px-16 pb-3 gap-2 border border-transparent border-b-border/30">
      <div className="text-base font-bold w-full items-start">회원 정보 관리</div>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await SubmitProfileUpdate({
              nickname: isNicknameDirty ? nickname : userInfo.nickname,
              profileUrl: isProfileImageDirty
                ? await handlePresignedUrl({
                    file,
                    token,
                    type: 'image',
                    uploadType: 'PROFILE_IMAGE',
                  })
                : undefined,
              setIsNicknameDirty,
              isProfileImageDirty,
              setIsProfileImageDirty,
              setHelperText: (value: string) => setHelperText(value),
              token,
            });
            queryClient.refetchQueries({ queryKey: ['userInfo'] });
          }}
        >
          <ProfileImageInput onFileSelect={setFile} />
          <p className="flex w-full justify-end text-xs text-error h-4">{helperText}</p>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <NicknameInput
                nickname={nickname}
                setNickname={setNickname}
                setHelperText={setHelperText}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div>이메일</div>
              <div className="text-text-secondary text-sm px-3 py-1">{email}</div>
            </div>
          </div>
          <div className="flex w-full justify-end mt-6">
            <Button
              type="submit"
              variant={'primary'}
              label="저장하기"
              className="px-6 py-2 rounded-xl"
              disabled={!isAnyDirty}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
