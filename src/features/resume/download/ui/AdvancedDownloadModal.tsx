import { StateBasedModal } from '@/src/widgets/ui/modal';
import { useDownload } from '@/src/features/resume/download/model/downloadStore';

import { useRouter } from 'next/navigation';

export const AdvancedDownloadModal = () => {
  const router = useRouter();

  return (
    <StateBasedModal
      open={useDownload.getState().isReady}
      title="이력서 생성에 성공했어요!"
      description="이력서를 다운로드 받으시겠어요?"
      actionText="다운로드"
      onOpenChange={(open) => {
        if (!open) {
          useDownload.getState().setIsReady(false);
          router.push('/my');
        }
      }}
      onAction={() => {
        const rawUrl = useDownload.getState().url;
        if (rawUrl) {
          const link = document.createElement('a');
          link.href = rawUrl;
          const defaultFileName = 'resume_download.docx';
          try {
            const url = new URL(rawUrl);
            const pathname = url.pathname;
            const extractedName = pathname.substring(pathname.lastIndexOf('/') + 1);
            link.download = extractedName || defaultFileName;
          } catch {
            link.download = defaultFileName;
          }
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }}
    />
  );
};

export default AdvancedDownloadModal;
