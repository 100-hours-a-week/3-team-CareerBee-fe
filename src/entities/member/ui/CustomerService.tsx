export const CustomerService = () => {
  return (
    <div className="flex flex-col px-16 py-3 gap-2 border border-transparent border-b-border/30">
      <div className="text-base font-bold w-full items-start">고객 지원</div>
      <div className="flex flex-col justify-center w-full gap-2 pl-3 text-sm">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSd4aonIlsExBLyBlfSpTIkE35fLDXyqNv6BqlYmBV3zAcAWIA/viewform?usp=sharing&ouid=103644131894250207807"
          target="_blank"
          rel="noopener noreferrer"
        >
          문의 남기기
        </a>
        <a
          href="https://www.notion.so/204d69fad2e680e9b283c4ff8fbd97ed?source=copy_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          도움말 보기
        </a>
      </div>
    </div>
  );
};

export default CustomerService;
