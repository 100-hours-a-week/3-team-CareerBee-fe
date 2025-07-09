'use client';

import { Button } from '@/src/widgets/ui/button';
import Dropdown from '@/src/widgets/ui/dropdown';
import { Modal } from '@/src/widgets/ui/modal';

import handleQuit from '@/src/features/member/api/handleQuit';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [selectedReason, setSelectedReason] = useState('');

  return (
    <div className="flex flex-col gap-6 py-3 px-16 w-full mb-auto">
      <div className="text-xl font-bold w-full items-start">회원 탈퇴를 진행할게요.</div>
      <div className="flex w-full justify-center">
        <img src="/images/logo.png" className="w-28" alt="커리어비 로고" />
      </div>
      <div className=" flex flex-col gap-1 text-sm font-medium">
        <p className="text-center">그동안 커리어비와 함께해 주셔서 감사합니다.🙇</p>
        <p className="text-center">
          마지막으로 탈퇴 사유를 알려주시면, 더 나은 서비스로 보답하겠습니다.
        </p>
      </div>
      <div className="flex w-full">
        <Dropdown
          placeholder="탈퇴 이유를 알려주세요."
          items={[
            { label: '서비스를 자주 이용하지 않아요.', value: 'not-frequent' },
            { label: '원하는 기능이 없어요.', value: 'no-feature' },
            { label: '사용이 불편해요.', value: 'inconvenient' },
            { label: '개인정보가 걱정돼요.', value: 'privacy' },
            { label: '기타', value: 'other' },
          ]}
          onChange={(value) => setSelectedReason(value)}
        />
      </div>
      <div className="flex gap-6">
        <Button
          variant="primary"
          label="되돌아가기"
          className="w-full rounded-xl"
          onClick={() => {
            router.back();
          }}
        ></Button>
        <Modal
          trigger={
            <Button
              variant="secondary"
              label="탈퇴하기"
              className="w-full rounded-xl"
              disabled={!selectedReason}
            ></Button>
          }
          title="정말 탈퇴하시겠어요?"
          description={
            <>
              탈퇴 시 계정 정보는 모두 삭제되며,
              <br />
              <p className="font-black">다시 회원가입할 수 없습니다.</p>
            </>
          }
          cancelText="되돌아가기"
          actionText="탈퇴 진행하기"
          cancelButton={false}
          onAction={() => handleQuit(selectedReason)}
        />
      </div>
    </div>
  );
}
