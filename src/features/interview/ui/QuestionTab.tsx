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
    <div className="mt-4">
      {/* 답변 입력 */}
      <form>
        <LongTextForm
          title="질문이 ㅇㄹㅇㄴㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㅏㄴ일ㄴ어림ㄴ이ㅏ리ㅏ어리ㅓ아러ㅣ넝러ㅣㄴ어ㅣㅏㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹ."
          controllerName="question"
          rules={{
            minLength: [20, '입력을 확인해주세요. (최소 20자)'],
            maxLength: [500, '입력을 확인해주세요. (최대 500자)'],
          }}
          placeholder="답변을 입력해주세요."
          control={control}
          errors={errors.question}
          mainQuestion={true}
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
    </div>
  );
};

export default QuestionTab;
