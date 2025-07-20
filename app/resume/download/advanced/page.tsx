'use client';

import Question from '@/src/features/resume/download/ui/Question';

export default function Page() {
  return (
    <div className="flex flex-col py-3 px-16 w-full mb-auto gap-4 overflow-y-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold">
          더 완성도 높은 이력서를 만들어드리기 위해 추가 정보가 필요해요.
        </h1>
        <Question />
      </div>
    </div>
  );
}
