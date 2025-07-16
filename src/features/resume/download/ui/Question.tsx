import LongTextForm from '@/src/features/resume/form/ui/longtextForm';
import { Button } from '@/src/widgets/ui/button';
import AILoading from '@/src/shared/ui/AILoading';

import { useAIResponseState } from '@/src/features/resume/download/api/fetchQuestion';
import { useAIStore } from '@/src/shared/model/eventAIQuestionReady';

import { useForm } from 'react-hook-form';

export const Question = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      question: '',
    },
    mode: 'onChange',
  });

  const { isLoading } = useAIResponseState();
  const { aiQuestion } = useAIStore();

  return (
    <>
      {isLoading ?? <AILoading />}
      <form>
        <LongTextForm
          title={aiQuestion?.question ?? '질문이 들어옵니다.'}
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
    </>
  );
};

export default Question;
