export default function Footer() {
  return (
    <div className="flex flex-col bottom-0 w-full py-6 gap-6 bg-[#EEEDED] text-xs text-text-secondary">
      <div className="flex justify-center gap-2">
        <a href="/help">이용약관</a>
        <p> | </p>
        <a href="/help">개발자들</a>
        <p> | </p>
        <a href="/help">문의 남기기</a>
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="w-full text-center">상호명: 커리어비 대표자: 박성춘 버전: v1.0.0</p>
        <p className="w-full text-center">이메일: Ssammu@example.com</p>
        <p className="w-full text-center">
          주소: 경기 성남시 분당구 대왕판교로 660 유스페이스 1 A동 405호
        </p>
      </div>
    </div>
  );
}
