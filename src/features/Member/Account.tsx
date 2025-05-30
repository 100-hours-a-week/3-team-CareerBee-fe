import noProfile from '/assets/no-profile.png';
import { Button } from '@/components/ui/button';

export default function Account() {
  return (
    <div className="py-3 w-full">
      <div className="flex flex-col px-16 pb-3 gap-2 border border-transparent border-b-border/30">
        <div className="text-base font-bold w-full items-start">회원 정보 관리</div>
        <div className="flex justify-center w-full ">
          <img src={noProfile} alt="프로필 이미지" className="w-24 h-24"></img>
        </div>
        <div>
          <p className="text-xs text-error">*변경 사항이 있다면 저장하기를 눌러주세요.</p>
          <form></form>
        </div>
      </div>
      <div className="flex flex-col px-16 py-3 gap-2 border border-transparent border-b-border/30">
        <div className="text-base font-bold w-full items-start">고객 지원</div>
        <div className="flex flex-col justify-center w-full gap-2 pl-3 text-sm">
          <a href="/qanda">문의 남기기</a>
          <a href="/help">도움말 보기</a>
        </div>
      </div>
      <div className="flex px-16 py-3 gap-2 border border-transparent border-b-border/30">
        <Button label="회원탈퇴" size="sm" variant="link" className="underline pl-3 py-2"></Button>
      </div>
    </div>
  );
}
