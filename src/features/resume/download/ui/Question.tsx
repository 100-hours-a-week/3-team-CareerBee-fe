import LongTextForm from '@/src/features/resume/form/ui/longtextForm';
import { Button } from '@/src/widgets/ui/button';
import { AILoading } from '@/src/widgets/ui/loader';

import {
  useExtraQuestion,
  useAIResponseState,
} from '@/src/features/resume/download/model/extraQuestionStore';
import { useAnswer } from '@/src/features/resume/download/model/answerStore';
import { fetchQuestion } from '@/src/features/resume/download/api/fetchQuestionSecond';

import { useForm } from 'react-hook-form';

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
    </div>
  );
};

export default Question;
