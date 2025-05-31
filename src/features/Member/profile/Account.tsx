import Footer from './components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { toast } from '@/hooks/useToast';

import noProfile from '/assets/no-profile.png';
import imageUpdate from '@/features/Member/profile/image/image-update.png';

import { useState, useEffect } from 'react';
import React from 'react';

export default function Account() {
  const originalNickname = '회원 닉네임';
  const originalEmail = '회원 이메일';

  const [nickname, setNickname] = useState(originalNickname);
  const [email, setEmail] = useState(originalEmail);
  const [isDirty, setIsDirty] = useState(false);

  // 값이 바뀌면 isDirty를 true로 변경
  useEffect(() => {
    setIsDirty(nickname !== originalNickname || email !== originalEmail);
  }, [nickname, email]);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 서버로 데이터를 보내는 로직
    setIsDirty(false);
    toast({ title: '저장 완료', variant: 'success', duration: 500000 });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="py-3 w-full mb-auto">
        <div className="flex flex-col px-16 pb-3 gap-2 border border-transparent border-b-border/30">
          <div className="text-base font-bold w-full items-start">회원 정보 관리</div>
          <div className="flex justify-center w-full ">
            <div className="relative w-24 h-24">
              <img src={noProfile} alt="프로필 이미지" className="w-24 h-24"></img>
              <img
                src={imageUpdate}
                alt="이미지 업데이트"
                className="absolute bottom-1 right-1 w-[1.3125rem] h-[1.3125rem]"
              />
            </div>
          </div>
          <div>
            <p className="flex w-full justify-end text-xs text-error">
              *변경 사항이 있다면 저장하기를 눌러주세요.
            </p>
            <form onSubmit={submitForm}>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <div>닉네임</div>
                  <Input
                    className="px-3 py-1"
                    value={nickname}
                    onChange={(e) => {
                      setNickname(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div>이메일</div>
                  <Input
                    className="px-3 py-1"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
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
          ></Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
