'use client';

import { StateBasedModal } from '@/src/widgets/ui/modal';
import GridFormat from '@/src/entities/resume/download/ui/GridFormat';
import { DownloadButton } from '@/src/features/resume/download/ui/downloadButton';

import { findTier } from '@/src/entities/resume/download/lib/findTier';
import { useResumeResultStore } from '@/src/features/resume/form/model/resumeStore';
import { handleDownload } from '@/src/features/resume/download/model/handleDownload';

import React from 'react';

export default function Form() {
  const { result: data } = useResumeResultStore();

  const { isSuccess, setIsSuccess, isFailed, setIsFailed } = handleDownload();
  return (
    <>
      <div className="gap-0">
        <hr />
        <div className="grid grid-cols-[auto,1fr] gap-y-4 text-sm py-2">
          <GridFormat>선호 직무</GridFormat>
          <div className="font-medium pl-4">{data.preferredJob}</div>
          <GridFormat>백준 티어</GridFormat>
          <div className="font-medium pl-4">{findTier(data.psTier)}</div>
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
          <div className="font-medium pl-4">{data.companyName ? data.companyName : '-'}</div>
          <GridFormat className="px-2">근무 기간</GridFormat>
          <div className="font-medium pl-4">{data.workPeriod ? data.workPeriod : '-'} 개월</div>
          <GridFormat className="px-2">직무</GridFormat>
          <div className="font-medium pl-4">{data.position ? data.position : '-'}</div>
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

      <DownloadButton />

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
