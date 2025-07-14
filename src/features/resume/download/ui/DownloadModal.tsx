import { StateBasedModal } from '@/src/widgets/ui/modal';

import { useDownload } from '@/src/features/resume/download/model/useDownload';

export const DownloadModal = () => {
  const { isSuccess, setIsSuccess, isFailed, setIsFailed } = useDownload();

  return (
    <>
      <StateBasedModal
        open={isSuccess}
        onOpenChange={() => {}}
        title="이력서가 생성되었어요."
        description={<>다시 보고 싶다면 마이페이지 → 내 이력 조회에서 확인하실 수 있어요.</>}
        actionText="확인"
        cancelButton={false}
        onAction={() => {
          setIsSuccess(false);
        }}
      />
      <StateBasedModal
        open={isFailed}
        onOpenChange={() => {}}
        title="이력서를 만드는 중에 문제가 생겼어요."
        description={<>잠시 후 다시 시도해주세요.</>}
        actionText="확인"
        cancelButton={false}
        onAction={() => {
          setIsFailed(false);
        }}
      />
    </>
  );
};

export default DownloadModal;
