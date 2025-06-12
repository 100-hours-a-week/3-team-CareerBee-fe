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
      <p className="text-xs">(13시 10분 ~ 13시 20분)</p>
    </div>
  );
}
