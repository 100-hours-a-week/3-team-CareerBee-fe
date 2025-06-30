import Footer from './components/footer';
import { Button } from '@/components/ui/button';
import ProfileImageInput from './components/profileImageInput';
import NicknameInput from './components/nicknameInput';

import { SubmitProfileUpdate } from './util/submitProfileUpdate';
import { useUserInfo } from '@/hooks/useUserInfo';
import { useDirty } from './contexts/isDirtyContext';
import { handlePresignedUrl } from './util/handlePresignedUrl';
import { useAuthStore } from '@/features/Member/auth/store/auth';

import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const navigate = useNavigate();
  const { data: userInfo } = useUserInfo();
  const queryClient = useQueryClient();

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
    if (isAnyDirty) {
      setHelperText('*저장하기를 눌러주세요.');
    } else {
      setHelperText('');
    }
  }, [isAnyDirty]);

  const token = useAuthStore((state) => state.token);

  return (
    <div className="flex flex-col h-full">
      <div className="py-3 w-full mb-auto">
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
        <div className="flex flex-col px-16 py-3 gap-2 border border-transparent border-b-border/30">
          <div className="text-base font-bold w-full items-start">고객 지원</div>
          <div className="flex flex-col justify-center w-full gap-2 pl-3 text-sm">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSd4aonIlsExBLyBlfSpTIkE35fLDXyqNv6BqlYmBV3zAcAWIA/viewform?usp=sharing&ouid=103644131894250207807"
              target="_blank"
              rel="noopener noreferrer"
            >
              문의 남기기
            </a>
            <a
              href="https://www.notion.so/204d69fad2e680e9b283c4ff8fbd97ed?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              도움말 보기
            </a>
          </div>
        </div>
        <div className="flex px-16 py-3 gap-2 border border-transparent border-b-border/30">
          <Button
            label="회원탈퇴"
            size="sm"
            variant="link"
            className="underline pl-3 py-2"
            onClick={() => {
              navigate('/my/account/quit');
            }}
          ></Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
