'use client';

import { PiBriefcase } from 'react-icons/pi';
import { Recruitment } from '@/src/entities/company/model/companyType';
import { fetchRecruitments } from '@/src/entities/company/api/fetchRecruitments';

import { useQuery } from '@tanstack/react-query';

export default function RecruitTab({ id }: { id: number }) {
  const {
    data: recruitments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['recruitments', id],
    queryFn: () => fetchRecruitments({ companyId: id }),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <div className="px-2">
      <div className="flex gap-2 py-2 [&_svg]:size-5">
        <PiBriefcase />
        <p>현재 채용 정보</p>
      </div>
      {isLoading ? (
        <></>
      ) : isError || recruitments === null ? (
        <p className="px-7">채용 정보를 불러오는 데 실패했어요.</p>
      ) : recruitments.length > 0 ? (
        <ul className="space-y-2 px-7">
          {recruitments.map((recruitment: Recruitment) => (
            <li key={recruitment.id} className="flex gap-1 items-start">
              <p className="whitespace-nowrap">[{recruitment.title}]</p>
              <a
                href={recruitment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary underline hover:text-text-primary/60 truncate"
              >
                {recruitment.url}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-7">현재 채용 중이 아니에요.</p>
      )}
    </div>
  );
}
