'use client';

import GridFormat from '@/src/entities/resume/download/ui/GridFormat';
import DownloadButton from '@/src/features/resume/download/ui/DownloadButton';
import DownloadModal from '@/src/features/resume/download/ui/DownloadModal';

import { findTier } from '@/src/entities/resume/download/lib/findTier';
import { useResumeResultStore } from '@/src/features/resume/form/model/resumeStore';

import React from 'react';

export default function Form() {
  const { result: data } = useResumeResultStore();

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
      <DownloadModal />
    </>
  );
}
