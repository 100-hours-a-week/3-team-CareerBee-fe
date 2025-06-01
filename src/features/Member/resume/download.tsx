export default function Download() {
  return (
    <div className="flex flex-col py-6 px-6 sm:px-16 w-full mb-auto gap-6 text-sm">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold">입력하신 이력 정보입니다</h1>
        <p className="text-sm text-muted-foreground">
          작성하신 내용을 바탕으로 이력서 초안을 작성해드릴까요?
        </p>
      </div>
    </div>
  );
}
