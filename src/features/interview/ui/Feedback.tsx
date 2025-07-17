'use client';

import { Button } from '@/src/widgets/ui/button';
import BookmarkButton from '@/src/features/company/ui/BookmarkButton';
import ShareButton from '@/src/features/company/ui/ShareButton';
import { BuyInterviewModal } from './BuyInterviewModal';
import { AILoading } from '@/src/widgets/ui/loader';

// import { useFeedback } from '@/src/features/interview/model/useFeedback';
import { useAuthStore } from '@/src/entities/auth/model/auth';
import { useFeedbackStore } from '@/src/features/interview/model/feedbackStore';
import { useMemberQuestionQuery } from '@/src/entities/interview/model/useMemberQuestionQuery';

import { useQuery } from '@tanstack/react-query';

export const Feedback = () => {
  // const { feedback } = useFeedback();
  const { isLoading } = useFeedbackStore();
  const token = useAuthStore.getState().token;
  const { data: question } = useMemberQuestionQuery(!!token);
  const { data: feedback } = useQuery<{ feedback: string } | undefined>({
    queryKey: ['feedback', question?.memberInterviewProblemResp.id],
    enabled: false,
  });

  return (
    <>
      <hr />

      {isLoading ? (
        <div className="h-full w-full">
          <AILoading title="피드백 생성 중..." />
        </div>
      ) : (
        <>
          <div className="px-2 min-h-[180px]">{feedback?.feedback}</div>
          <div className="flex flex-col mt-auto gap-2">
            <div className="flex items-center justify-center gap-16 [&_svg]:size-6 bg-transparent">
              <ShareButton />
              <BuyInterviewModal>
                <Button label="다음 문제 보기" variant="primary"></Button>
              </BuyInterviewModal>
              <BookmarkButton className="px-3 py-1" companyId={0} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Feedback;
