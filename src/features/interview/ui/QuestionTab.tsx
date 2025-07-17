'use client';

import LongTextForm from '@/src/features/resume/form/ui/longtextForm';
import { Button } from '@/src/widgets/ui/button';
import QuestionTitle from '@/src/entities/interview/ui/QuestionTitle';

import { useTabStore } from '@/src/entities/interview/model/tabStore';
import { useAuthStore } from '@/src/entities/auth/model/auth';
import { QuestionTabProps } from '@/src/entities/interview/model/interviewType';
import { useMemberQuestionQuery } from '@/src/entities/interview/model/useMemberQuestionQuery';

import { useForm } from 'react-hook-form';
import Link from 'next/link';

export const QuestionTab = ({ questions }: QuestionTabProps) => {
  // const token = useAuthStore.getState().token;
  const token = useAuthStore((state) => state.token);
  const activeTab = useTabStore((s) => s.activeTab);

  // 회원용 CSR 쿼리
  const {
    data: memberQuestionText,
    refetch,
    isFetching,
  } = useMemberQuestionQuery(activeTab, !!token || activeTab === 'SAVED');

  // 비회원용 SSR 데이터
  const guestQuestionText = questions.find((q) => q.type === activeTab)?.question ?? '';

  const questionText = token
    ? memberQuestionText?.memberInterviewProblemResp.question
    : guestQuestionText;

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
      <form>
        <QuestionTitle questionText={questionText} />
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
          {!token && (
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
