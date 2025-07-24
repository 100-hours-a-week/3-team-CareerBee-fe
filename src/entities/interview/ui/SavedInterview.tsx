import QuestionTitle from './QuestionTitle';

export const SavedInterview = () => {
  return (
    <div>
      <div
        className="w-full h-2"
        style={{
          background: 'linear-gradient(to bottom, #F7C746 0%, #FAFAFA 100%)',
        }}
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <QuestionTitle questionText="저장된 질문" />
        </div>

        <div className="text-gray">내 답변</div>

        <hr />

        <div>피드백</div>
      </div>
    </div>
  );
};

export default SavedInterview;
