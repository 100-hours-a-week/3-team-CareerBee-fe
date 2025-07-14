import { Button } from '@/src/widgets/ui/button';
import { handleDownload } from '@/src/features/resume/download/model/handleDownload';

import { useRouter } from 'next/navigation';

export const DownloadButton = () => {
  const router = useRouter();
  const { requestResume } = handleDownload();

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
  );
};
