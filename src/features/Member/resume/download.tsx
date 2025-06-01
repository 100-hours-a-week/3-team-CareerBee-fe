import { Button } from '@/components/ui/button';

export default function Download() {
  return (
    <div className="flex flex-col py-3 px-6 w-full mb-auto gap-6 text-sm">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold">입력하신 이력 정보입니다</h1>
        <p className="text-sm text-muted-foreground">
          작성하신 내용을 바탕으로 이력서 초안을 작성해드릴까요?
        </p>
      </div>

      <hr />

      <div className="grid grid-cols-2 gap-y-4 text-sm">
        <div className="text-muted-foreground">선호 직무</div>
        <div className="font-medium">프론트엔드</div>
        <div className="text-muted-foreground">백준 티어</div>
        <div className="font-medium">브론즈</div>
        <div className="text-muted-foreground">IT 자격증 개수</div>
        <div className="font-medium">0 개</div>
        <div className="text-muted-foreground">프로젝트 개수</div>
        <div className="font-medium">0 개</div>
        <div className="text-muted-foreground">전공자/비전공자</div>
        <div className="font-medium">전공자</div>
      </div>

      <hr />

      <div className="grid grid-cols-2 gap-y-4 text-sm">
        <div className="text-muted-foreground">기업</div>
        <div className="font-medium">카카오</div>
        <div className="text-muted-foreground">근무 기간</div>
        <div className="font-medium">0 개월</div>
        <div className="text-muted-foreground">직무</div>
        <div className="font-medium">프론트엔드</div>
      </div>

      <hr />

      <div className="flex flex-col gap-2 text-sm">
        <div className="text-muted-foreground">기타 어필</div>
        <div className="whitespace-pre-line leading-relaxed font-medium">
          줄글이 들어옵니다. 줄글이 들어옵니다. 줄글이 들어옵니다. 줄글이 들어옵니다.
        </div>
      </div>

      <hr />

      <div className="flex w-full gap-auto justify-between mt-4 px-4">
        <Button
          label="아니요, 진척도만 확인할게요"
          variant="secondary"
          className="w-[11.5625rem] rounded-lg text-xs font-medium"
        ></Button>
        <Button
          label="이력서 초안 다운로드"
          variant="primary"
          className="w-[11.5625rem] rounded-lg text-xs font-medium"
        ></Button>
      </div>
    </div>
  );
}
