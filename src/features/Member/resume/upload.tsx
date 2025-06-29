import { Button } from '@/components/ui/button';

import fileUpload from '@/features/Member/resume/image/file-arrow-up-light.svg';

import { useAuthStore } from '@/features/Member/auth/store/auth';
import { uploadPdf } from './util/uploadPdf';

import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Upload() {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

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

  const [fileUrl, setFileUrl] = useState<string | null>(null);

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
        <form onSubmit={(e) => uploadPdf(e, token, navigate)}>
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
                <img src={fileUpload} alt="이력서 업로드" className="h-8 w-8 opacity-60" />
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
                render={({ field }) => (
                  <input
                    type="file"
                    id="resume-upload"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      try {
                        field.onChange(e.target.files);

                        if (
                          file &&
                          file.type === 'application/pdf' &&
                          file.size <= 10 * 1024 * 1024
                        ) {
                          const url = URL.createObjectURL(file);
                          setFileUrl(url);
                        } else {
                          setFileUrl(null);
                        }
                      } catch (err) {
                        setFileUrl(null);
                        field.onChange(undefined);
                        setError('resume', {
                          type: 'manual',
                          message: '파일 업로드에 실패했습니다. 다시 시도해주세요.',
                        });
                      }
                    }}
                    className="hidden"
                  />
                )}
              />
            </label>
            <p className="text-xs text-error font-medium w-64 text-start">
              {errors.resume?.message?.toString() || 'PDF 파일만 업로드할 수 있습니다.'}
            </p>
          </div>
          <div className="flex gap-16 pt-12 w-full justify-center">
            <Button
              label="건너뛰기"
              variant="secondary"
              className="w-40"
              onClick={() => navigate('/resume/form')}
            />
            <Button
              type="submit"
              disabled={!isReady}
              label="완료"
              variant="primary"
              className="w-40"
              // onClick={() => navigate('/resume/form')}
            />
          </div>
        </form>
      </div>
    </>
  );
}
