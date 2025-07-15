import LongTextForm from '@/src/features/resume/form/ui/longtextForm';
import { Button } from '@/src/widgets/ui/button';

import { useForm } from 'react-hook-form';

export const QuestionTab = () => {
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
  return (
    <>
      {/* 제목 */}
      <div> </div>
      {/* 답변 입력 */}
      <form>
        <LongTextForm
          title="질문이 들어옵니다."
          controllerName="question"
          rules={{
            minLength: [20, '입력을 확인해주세요. (최소 20자)'],
            maxLength: [500, '입력을 확인해주세요. (최대 500자)'],
          }}
          placeholder="답변을 입력해주세요."
          control={control}
          errors={errors.question}
        />

        <div className="flex w-full justify-center mt-10">
          <Button
            type="submit"
            disabled={!watch('question')}
            label="AI 첨삭 확인하기"
            className="rounded-lg w-44"
          />
        </div>
      </form>
    </>
  );
};

export default QuestionTab;
