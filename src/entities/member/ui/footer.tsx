export default function Footer() {
  return (
    <div className="flex flex-col bottom-0 w-full py-6 gap-6 bg-[#EEEDED] text-xs text-text-secondary">
      <div className="flex justify-center gap-2">
        <a
          href="https://www.notion.so/204d69fad2e6804cb27bc0611f07bb06?source=copy_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          이용약관
        </a>
        <p> | </p>
        <a href="/service/developers">개발자들</a>
        <p> | </p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSd4aonIlsExBLyBlfSpTIkE35fLDXyqNv6BqlYmBV3zAcAWIA/viewform?usp=sharing&ouid=103644131894250207807"
          target="_blank"
          rel="noopener noreferrer"
        >
          문의 남기기
        </a>
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
