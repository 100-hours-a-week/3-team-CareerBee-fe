import { Button } from '@/src/widgets/ui/button';
import { useDownload } from '@/src/features/resume/download/model/useDownload';

import { fetchQuestion } from '@/src/features/resume/download/api/fetchQuestion';

import { useRouter } from 'next/navigation';

export const DownloadButton = () => {
  const router = useRouter();
  const { requestResume } = useDownload();

  return (
    <div className="gap-3 flex flex-col">
      <div className="flex w-full gap-auto justify-between mt-4 px-4">
        <Button
          label="이력서 초안 생성"
          variant="secondary"
          className="w-[11.5625rem] rounded-lg text-xs font-medium"
          onClick={requestResume}
        ></Button>
        <Button
          label="고급 이력서 생성"
          variant="primary"
          className="w-[11.5625rem] rounded-lg text-xs font-medium"
          onClick={() => {
            fetchQuestion();
            router.push('/resume/download/advanced');
          }}
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
  );
};

export default DownloadButton;
