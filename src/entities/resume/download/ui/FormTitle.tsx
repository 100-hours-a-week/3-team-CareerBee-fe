export const FormTitle = () => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-lg font-bold">입력하신 이력 정보입니다</h1>
      <p className="text-sm text-muted-foreground">작성하신 내용을 바탕으로 이력서를 작성할까요?</p>
    </div>
  );
};

export default FormTitle;
