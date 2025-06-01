import { Button } from '@/components/ui/button';

import fileUpload from '@/features/Member/Resume/image/file-arrow-up-light.svg';

import { useState } from 'react';
import React from 'react';

export default function Upload() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8 py-3 px-16 w-full">
        <div className="flex flex-col gap-3">
          <div className="text-lg font-bold w-full items-start">내 이력 입력하기</div>
          <div className="flex flex-col gap-2 text-xs font-medium">
            <p>정확한 정보를 위해 잠시만 시간을 내어주세요.</p>
            <p>이력서를 업로드하면, 더 정밀한 분석 결과를 받아볼 수 있어요.</p>
          </div>
        </div>
        <div className="flex flex-col w-full items-center gap-2 px-[5.5rem]">
          <label
            htmlFor="resume-upload"
            className="w-full h-72 border border-border rounded-lg flex items-center justify-center bg-[#EFEFF0] cursor-pointer"
          >
            {fileUrl ? (
              <iframe
                src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full rounded-lg"
              />
            ) : (
              <img src={fileUpload} alt="upload" className="h-8 w-8 opacity-60" />
            )}
            <input
              type="file"
              id="resume-upload"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <p className="text-xs text-error font-medium w-full text-start">
            *pdf 파일만 추가 가능합니다.
          </p>
        </div>
        <div className="flex gap-16 w-full justify-center">
          <Button
            label="건너뛰기"
            variant="secondary"
            className="w-40"
            onClick={() => (window.location.href = '/my')}
          />
          <Button
            label="완료"
            variant="primary"
            className="w-40"
            onClick={() => (window.location.href = '/resume/form')}
          />
        </div>
      </div>
    </>
  );
}
