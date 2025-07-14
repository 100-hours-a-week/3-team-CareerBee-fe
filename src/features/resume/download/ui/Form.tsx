'use client';

import { Button } from '@/src/widgets/ui/button';
import { StateBasedModal } from '@/src/widgets/ui/modal';
import GridFormat from '@/src/features/resume/download/ui/GridFormat';

import { useResumeResultStore } from '@/src/features/resume/form/model/resumeStore';
import { handleDownload } from '@/src/features/resume/download/model/handleDownload';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Form() {
  const router = useRouter();
  const { result: data } = useResumeResultStore();

  const { isSuccess, setIsSuccess, isFailed, setIsFailed, requestResume } = handleDownload();
  return (
    <>
      <div className="gap-0">
        <hr />
        <div className="grid grid-cols-[auto,1fr] gap-y-4 text-sm py-2">
          <GridFormat>선호 직무</GridFormat>
          <div className="font-medium pl-4">{data.preferredJob}</div>
          <GridFormat>백준 티어</GridFormat>
          <div className="font-medium pl-4">{data.psTier}</div>
          <GridFormat>IT 자격증 개수</GridFormat>
          <div className="font-medium pl-4">{data.certificationCount} 개</div>
          <GridFormat>프로젝트 개수</GridFormat>
          <div className="font-medium pl-4">{data.projectCount} 개</div>
          <GridFormat>전공자/비전공자</GridFormat>
          <div className="font-medium pl-4">{data.majorType}</div>
        </div>

        <div className="font-semibold pt-3 pb-2">경력</div>
        <hr />

        <div className="grid grid-cols-[auto,1fr] gap-y-4 py-2 text-sm">
          <GridFormat className="px-2">기업</GridFormat>
          <div className="font-medium pl-4">카카오</div>
          <GridFormat className="px-2">근무 기간</GridFormat>
          <div className="font-medium pl-4">{data.workPeriod} 개월</div>
          <GridFormat className="px-2">직무</GridFormat>
          <div className="font-medium pl-4">{data.position}</div>
        </div>

        <div className="font-semibold pt-3 pb-2">기타 어필</div>
        <hr />

        <div className="flex flex-col px-2 py-2 text-sm">
          <div className="whitespace-pre-line leading-relaxed font-medium">
            {data.additionalExperiences}
          </div>
        </div>

        <hr />
      </div>

      <div className="gap-3 flex flex-col">
        <div className="flex w-full gap-auto justify-between mt-4 px-4">
          <Button
            label="이력서 초안 생성"
            variant="secondary"
            className="w-[11.5625rem] rounded-lg text-xs font-medium"
            onClick={requestResume}
          ></Button>
          <Button
            label="고급 이력서 생성(Coming Soon)"
            variant="primary"
            disabled={true}
            className="w-[11.5625rem] rounded-lg text-xs font-medium"
          ></Button>
        </div>
        <Button
          label="홈으로"
          variant="link"
          fullWidth={true}
          className="text-xs font-medium underline"
          onClick={() => {
            router.push('/');
          }}
        ></Button>
      </div>
      <StateBasedModal
        open={isSuccess}
        onOpenChange={() => {}}
        title="이력서가 생성되었어요."
        description={<>다시 보고 싶다면 마이페이지 → 내 이력 조회에서 확인하실 수 있어요.</>}
        actionText="확인"
        cancelButton={false}
        onAction={() => {
          setIsSuccess(false);
        }}
      />
      <StateBasedModal
        open={isFailed}
        onOpenChange={() => {}}
        title="이력서를 만드는 중에 문제가 생겼어요."
        description={<>잠시 후 다시 시도해주세요.</>}
        actionText="확인"
        cancelButton={false}
        onAction={() => {
          setIsFailed(false);
        }}
      />
    </>
  );
}
