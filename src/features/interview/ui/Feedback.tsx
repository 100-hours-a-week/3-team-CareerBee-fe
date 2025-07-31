'use client';

import { Button } from '@/src/widgets/ui/button';
import BookmarkButton from '@/src/features/company/ui/BookmarkButton';
import ShareButton from '@/src/features/company/ui/ShareButton';
import { BuyInterviewModal } from './BuyInterviewModal';
import { AILoading } from '@/src/widgets/ui/loader';

import { useEffect } from 'react';
import { useMemberQuestionQuery } from '@/src/entities/interview/model/useMemberQuestionQuery';
import { useFeedbackStore } from '@/src/features/interview/model/feedbackStore';

import Markdown from 'react-markdown';

export const Feedback = ({ feedback }: { feedback: { feedback: string } | undefined }) => {
  const { isLoading, isReady, setIsReady } = useFeedbackStore();
  const { refetch } = useMemberQuestionQuery(false);

  useEffect(() => {
    if (isReady) {
      refetch();
      setIsReady(false);
    }
  }, [isReady, refetch]);

  return (
    <>
      <hr />

      {isLoading ? (
        <div className="h-full w-full">
          <AILoading title="피드백 생성 중..." />
        </div>
      ) : (
        <>
          <div className="px-2 ">
            <Markdown>{feedback?.feedback}</Markdown>
          </div>
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
