export const QuestionTitle = ({ questionText }: { questionText: string }) => {
  return (
    <div className="mr-auto font-medium font-bold text-lg mb-2">
      {questionText || '면접 문제가 들어옵니다.'}
    </div>
  );
};

export default QuestionTitle;
