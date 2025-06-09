import Footer from './components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProfileImageUploader from './components/profileImageUploader';

import { submitProfileUpdate } from './util/submitProfileUpdate';
import { useUserInfo } from '@/hooks/useUserInfo';
import { useDirty } from './contexts/isDirtyContext';
import { useAuthStore } from '@/features/Member/auth/store/auth';

import { useState, useEffect } from 'react';

export default function Account() {
  const { data: userInfo } = useUserInfo();
  const [nickname, setNickname] = useState(userInfo?.nickname || '닉네임');
  const [email, setEmail] = useState(userInfo?.email || '이메일');
  const [file, setFile] = useState<File | null>(null);
  const token = useAuthStore((state) => state.token);
  // 값이 바뀌면 isDirty를 true로 변경
  const { isDirty, setIsDirty } = useDirty();
  useEffect(() => {
    const originalNickname = userInfo?.nickname || '닉네임';
    const originalEmail = userInfo?.email || '이메일';
    setIsDirty(nickname !== originalNickname || email !== originalEmail);
  }, [nickname, email, userInfo]);

  const [helperText, setHelperText] = useState('');

  return (
    <div className="flex flex-col h-full">
      <div className="py-3 w-full mb-auto">
        <div className="flex flex-col px-16 pb-3 gap-2 border border-transparent border-b-border/30">
          <div className="text-base font-bold w-full items-start">회원 정보 관리</div>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitProfileUpdate({
                  file,
                  nickname,
                  email,
                  profileUrl: userInfo?.profileUrl ?? '',
                  setIsDirty,
                  setHelperText,
                  token,
                });
              }}
            >
              {/* <DirtyProvider> */}
              <ProfileImageUploader onFileSelect={setFile} />
              {/* </DirtyProvider> */}
              <p className="flex w-full justify-end text-xs text-error h-4">
                {helperText ? helperText : '*변경 사항이 있다면 저장하기를 눌러주세요.'}
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <div>{userInfo?.nickname || '닉네임'}</div>
                  <Input
                    className="px-3 py-1"
                    value={nickname}
                    onChange={(e) => {
                      setNickname(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div>{userInfo?.email || '이메일'}</div>

                  <Input
                    className="px-3 py-1"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setHelperText('');
                    }}
                  />
                </div>
              </div>
              <div className="flex w-full justify-end mt-6">
                <Button
                  type="submit"
                  variant={'primary'}
                  label="저장하기"
                  className="px-6 py-2 rounded-xl"
                  disabled={!isDirty}
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
              window.location.href = '/my/account/quit';
            }}
          ></Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
