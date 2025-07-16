import LongTextForm from '@/src/features/resume/form/ui/longtextForm';
import { Button } from '@/src/widgets/ui/button';

import { interviewType } from '@/src/entities/interview/model/questionStore';
import { useUserInfo } from '@/src/features/member/model/useUserInfo';
import { useQuestionStore } from '@/src/entities/interview/model/questionStore';

import { useForm } from 'react-hook-form';
import Link from 'next/link';

export const QuestionTab = ({ type }: { type: interviewType | 'SAVED' }) => {
  const { data: userInfo } = useUserInfo();
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

  const questionText = useQuestionStore((s) => s.getQuestionByType(type as interviewType));
  return (
    <>
      {/* 답변 입력 */}
      <form>
        <div className="mr-auto font-medium font-bold text-lg mb-2">
          {questionText || '면접 문제가 들어옵니다.'}
        </div>
        <div className="relative">
          <LongTextForm
            title=""
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
          {!userInfo?.token && (
            <div className="absolute inset-0 backdrop-blur-[2px] bg-white/10 flex items-center justify-center z-10 rounded-md">
              <div className="flex gap-2 items-center text-sm text-gray-700 font-medium">
                <p>회원만 참여할 수 있어요.</p>
                <Link href={'/login'} className="underline">
                  로그인하러 가기
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="flex w-full justify-center mt-6">
          <Button
            type="submit"
            disabled={!watch('question')}
            label="AI 첨삭 확인하기"
            className="rounded-lg w-44"
            // onClick={handleSubmit()}
          />
        </div>
      </form>
    </>
  );
};

export default QuestionTab;
