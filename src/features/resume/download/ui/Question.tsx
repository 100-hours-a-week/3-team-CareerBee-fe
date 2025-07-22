import AnswerForm from '@/src/features/resume/download/ui/AnswerForm';
import { Button } from '@/src/widgets/ui/button';
import { AILoading } from '@/src/widgets/ui/loader';
import AdvancedDownloadModal from './AdvancedDownloadModal';

import {
  useExtraQuestion,
  useAIResponseState,
} from '@/src/features/resume/download/model/extraQuestionStore';
import { useAnswer } from '@/src/features/resume/download/model/answerStore';
import { fetchQuestion } from '@/src/features/resume/download/api/fetchQuestionSecond';

import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export const Question = () => {
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

  const { setAnswer, step, setStep } = useAnswer();

  useEffect(() => {
    setStep(0);
  }, []);
  useEffect(() => {
    console.log('🚀 ~ Question ~ step:', step);
  }, [step]);

  const onSubmit = (data: { question: string }) => {
    setAnswer(data.question);
    fetchQuestion();
    setStep(step + 1);
    reset();
  };

  return (
    <div className="mt-4">
      {isLoading ? (
        step === 3 ? (
          <div className="flex flex-col items-center">
            <AILoading title="이력서 생성 중..." />
            <p className="text-sm text-text-primary mt-2 text-center">잠시 후 완료됩니다.</p>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              둘러보시다가 마이페이지 - 이력서 생성에서 다시 확인해보세요.
            </p>
          </div>
        ) : (
          <AILoading title="질문 생성 중..." />
        )
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

      <AdvancedDownloadModal />
    </div>
  );
};

export default Question;
