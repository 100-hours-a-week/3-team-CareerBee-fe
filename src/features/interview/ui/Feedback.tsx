import { Button } from '@/src/widgets/ui/button';
import BookmarkButton from '@/src/features/company/ui/BookmarkButton';
import ShareButton from '@/src/features/company/ui/ShareButton';

import { useFeedback } from '@/src/features/interview/model/useFeedback';

export const Feedback = () => {
  const { feedback } = useFeedback();
  return (
    <>
      <hr />

      <div className="px-2 min-h-[180px]">{feedback}</div>
      <div className="flex flex-col mt-auto gap-2">
        <div className="flex items-center justify-center gap-16 [&_svg]:size-6 bg-transparent">
          <ShareButton />
          <Button label="다음 문제 보기" variant="primary"></Button>
          <BookmarkButton companyId={0} />
        </div>
      </div>
    </>
  );
};

export default Feedback;
