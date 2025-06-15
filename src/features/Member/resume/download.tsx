import { Button } from '@/components/ui/button';
import { StateBasedModal } from '@/components/ui/modal';
import { CircleLoader } from '@/components/ui/loader';

import { useState } from 'react';
import React from 'react';

const LabelCell = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`w-[108px] text-muted-foreground border border-transparent border-r-border ${className}`}
  >
    {children}
  </div>
);

export default function Download() {
  const [isLoading, setIsLoading] = useState(false);
  const requestResume = () => {
    setIsLoading(true);
  };

  return (
    <div className="flex flex-col py-3 px-16 w-full mb-auto gap-6 text-sm">
      {isLoading ? (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/10">
          <CircleLoader size={100}></CircleLoader>
        </div>
      ) : (
        <></>
      )}
      <>
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-bold">입력하신 이력 정보입니다</h1>
          <p className="text-sm text-muted-foreground">
            작성하신 내용을 바탕으로 이력서 초안을 작성해드릴까요?
          </p>
        </div>

        <div className="gap-0">
          <hr />
          <div className="grid grid-cols-[auto,1fr] gap-y-4 text-sm py-2">
            <LabelCell>선호 직무</LabelCell>
            <div className="font-medium pl-4">프론트엔드</div>
            <LabelCell>백준 티어</LabelCell>
            <div className="font-medium pl-4">브론즈</div>
            <LabelCell>IT 자격증 개수</LabelCell>
            <div className="font-medium pl-4">0 개</div>
            <LabelCell>프로젝트 개수</LabelCell>
            <div className="font-medium pl-4">0 개</div>
            <LabelCell>전공자/비전공자</LabelCell>
            <div className="font-medium pl-4">전공자</div>
          </div>

          <div className="font-semibold pt-3 pb-2">경력</div>
          <hr />

          <div className="grid grid-cols-[auto,1fr] gap-y-4 py-2 text-sm">
            <LabelCell className="px-2">기업</LabelCell>
            <div className="font-medium pl-4">카카오</div>
            <LabelCell className="px-2">근무 기간</LabelCell>
            <div className="font-medium pl-4">0 개월</div>
            <LabelCell className="px-2">직무</LabelCell>
            <div className="font-medium pl-4">프론트엔드</div>
          </div>

          <div className="font-semibold pt-3 pb-2">기타 어필</div>
          <hr />

          <div className="flex flex-col px-2 py-2 text-sm">
            <div className="whitespace-pre-line leading-relaxed font-medium">
              줄글이 들어옵니다. 줄글이 들어옵니다. 줄글이 들어옵니다. 줄글이 들어옵니다.
            </div>
          </div>

          <hr />
        </div>
      </>

      <div className="flex w-full gap-auto justify-between mt-4 px-4">
        <Button
          label="아니요, 진척도만 확인할게요"
          variant="secondary"
          className="w-[11.5625rem] rounded-lg text-xs font-medium"
          onClick={() => (window.location.href = '/my')}
        ></Button>
        <Button
          label="이력서 초안 다운로드"
          variant="primary"
          className="w-[11.5625rem] rounded-lg text-xs font-medium"
          onClick={requestResume}
        ></Button>
        <StateBasedModal
          trigger={isLoading}
          title="이력서가 생성되었어요."
          description={<>다시 보고 싶다면 마이페이지 → 내 이력 조회에서 확인하실 수 있어요.</>}
          actionText="확인"
          cancelButton={false}
          onAction={() => (window.location.href = '/')}
        />
      </div>
    </div>
  );
}
