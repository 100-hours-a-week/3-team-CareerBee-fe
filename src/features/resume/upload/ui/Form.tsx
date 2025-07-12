'use client';

import fileUpload from '@/src/features/resume/assets/file-arrow-up-light.svg';

import UploadButton from '@/src/features/resume/upload/ui/UploadButton';
import ResumeUploadInput from '@/src/features/resume/upload/ui/ResumeUploadInput';

import { useUploadPdf } from '@/src/features/resume/upload/api/useUploadPdf';
import { useUploadUrlStore } from '@/src/features/resume/upload/model/urlStore';

import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';

export const UploadForm = () => {
  const { handleUpload } = useUploadPdf();
  const {
    watch,
    formState: { errors },
    control,
    setError,
  } = useForm<{ resume: FileList | undefined }>({
    defaultValues: {
      resume: undefined,
    },
  });
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const file = watch('resume')?.[0];
    if (file) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [watch('resume')]);

  const { fileUrl } = useUploadUrlStore();

  return (
    <form onSubmit={handleUpload}>
      <div className="flex flex-col w-full items-center gap-2">
        <label
          htmlFor="resume-upload"
          className="w-64 h-80 border border-border rounded-lg flex items-center justify-center bg-[#EFEFF0] cursor-pointer"
        >
          {fileUrl ? (
            <iframe
              src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-full rounded-lg"
            />
          ) : (
            <img src={fileUpload.src} alt="이력서 업로드" className="h-8 w-8 opacity-60" />
          )}
          <Controller
            name="resume"
            control={control}
            defaultValue={undefined}
            rules={{
              required: 'PDF 파일을 업로드해주세요.',
              validate: {
                isPdf: (value) =>
                  value?.[0]?.type === 'application/pdf' || 'PDF 파일만 업로드할 수 있습니다.',
                isSizeValid: (value) =>
                  !value?.[0] ||
                  value[0].size <= 10 * 1024 * 1024 ||
                  '최대 10MB까지 업로드할 수 있습니다.',
              },
            }}
            render={({ field }) => <ResumeUploadInput field={field} setError={setError} />}
          />
        </label>
        <p className="text-xs text-error font-medium w-64 h-4 text-start">
          {errors.resume?.message?.toString() ??
            (!watch('resume')?.[0] ? 'PDF 파일만 업로드할 수 있습니다.' : '')}
        </p>
      </div>
      <UploadButton isReady={isReady} />
    </form>
  );
};

export default UploadForm;
