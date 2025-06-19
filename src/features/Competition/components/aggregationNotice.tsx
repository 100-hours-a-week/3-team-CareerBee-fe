import PocketWatch from '@/features/Competition/image/pocket-watch-md.png';

export default function AggregationNotice() {
  return (
    <div className="flex flex-col justify-center items-center h-[436px]">
      <img
        src={PocketWatch}
        alt="pocket-watch"
        className="w-16 h-16 mb-4 drop-shadow-md animate-[bounce_1.5s_infinite]"
      />
      <p className="text-base">대회 집계 시간입니다.</p>
      <p className="text-xs">(13시 15분 ~ 집계 종료 시까지(2분 가량 소요 예정))</p>
    </div>
  );
}
