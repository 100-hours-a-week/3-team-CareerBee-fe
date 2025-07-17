export type interviewType = 'BACKEND' | 'FRONTEND' | 'DEVOPS' | 'AI';

export type QuestionTabProps = {
  questions: { type: interviewType | 'SAVED'; question: string }[];
};
