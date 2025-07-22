import AnswerForm from '@/src/features/resume/download/ui/AnswerForm';
import { Button } from '@/src/widgets/ui/button';
import { AILoading } from '@/src/widgets/ui/loader';
import { StateBasedModal } from '@/src/widgets/ui/modal';

import {
  useExtraQuestion,
  useAIResponseState,
} from '@/src/features/resume/download/model/extraQuestionStore';
import { useAnswer } from '@/src/features/resume/download/model/answerStore';
import { useDownload } from '@/src/features/resume/download/model/downloadStore';
import { fetchQuestion } from '@/src/features/resume/download/api/fetchQuestionSecond';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export const Question = () => {
  const router = useRouter();
  const { isLoading } = useAIResponseState();
  const { extraQuestion } = useExtraQuestion();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      question: '',
    },
    mode: 'onChange',
  });

  const { setAnswer } = useAnswer();

  const onSubmit = (data: { question: string }) => {
    setAnswer(data.question);
    fetchQuestion();
    reset();
  };

  return (
    <div className="mt-4">
      {isLoading ? (
        <AILoading title="질문 생성 중..." />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <AnswerForm
            title={extraQuestion?.question ?? '질문이 들어옵니다.'}
            controllerName="question"
            rules={{
              maxLength: [500, '입력을 확인해주세요. (최대 500자)'],
            }}
            placeholder="자유롭게 작성해주세요."
            control={control}
            errors={errors.question}
          />

          <div className="flex w-full justify-center mt-10">
            <Button
              type="submit"
              disabled={!watch('question')}
              label="다음 질문 보기"
              className="rounded-lg w-44"
            />
          </div>
        </form>
      )}

      <StateBasedModal
        open={useDownload.getState().isReady}
        title="이력서 생성에 성공했어요!"
        description="이력서를 다운로드 받으시겠어요?"
        actionText="다운로드"
        cancelText="홈으로"
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
    </div>
  );
};

export default Question;
