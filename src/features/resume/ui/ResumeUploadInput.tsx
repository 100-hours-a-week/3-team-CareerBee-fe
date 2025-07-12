import { useUploadUrlStore } from '@/src/features/resume/model/urlStore';
import { ControllerRenderProps, UseFormSetError } from 'react-hook-form';

export const ResumeUploadInput = ({
  field,
  setError,
}: {
  field: ControllerRenderProps<{ resume: FileList | undefined }, 'resume'>;
  setError: UseFormSetError<{ resume: FileList | undefined }>;
}) => {
  const { setFileUrl } = useUploadUrlStore();

  return (
    <input
      type="file"
      id="resume-upload"
      accept=".pdf"
      onChange={(e) => {
        const file = e.target.files?.[0];
        try {
          field.onChange(e.target.files);

          if (file && file.type === 'application/pdf' && file.size <= 10 * 1024 * 1024) {
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
  );
};

export default ResumeUploadInput;
