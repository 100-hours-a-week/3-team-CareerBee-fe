import LongTextForm from '@/src/features/resume/form/ui/longtextForm';
import { Button } from '@/src/widgets/ui/button';
// import AILoading from '@/src/shared/ui/AILoading';
import { AILoading } from '@/src/widgets/ui/loader';

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
  useEffect(() => {
    console.log('🚀 ~ Question ~ isLoading:', isLoading);
  }, [isLoading]);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      question: '',
    },
    mode: 'onChange',
  });

  const { setAnswer } = useAnswer();

  const onSubmit = (data: { question: string }) => {
    console.log('제출');
    setAnswer(data.question);
    fetchQuestion();
  };

  return (
    <>
      {isLoading ? (
        <AILoading title="질문 생성 중..." />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <LongTextForm
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
    </>
  );
};

export default Question;
