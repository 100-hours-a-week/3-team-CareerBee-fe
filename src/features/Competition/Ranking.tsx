import BarChart from '@/features/Competition/chart';
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '../Member/store/auth';

export default function Ranking() {
  const token = useAuthStore((state) => state.token);

  return (
    <div className="py-5">
      <div className="flex justify-between items-center px-6">
        <PiCaretLeft className="w-7 h-7" />
        <div className="font-ria font-bold text-[2rem]">오늘의 TOP10</div>
        <PiCaretRight className="w-7 h-7" />
      </div>
      <div className="flex flex-col justify-center items-center mt-6">
        <>
          <div className="flex mx-auto">
            <BarChart></BarChart>
          </div>
          <div className="mb-1 text-sm font-bold tracking-tighter">. . .</div>
          <div className="w-[440px] h-[40px] rounded-md flex bg-[url('/assets/red-rank.svg')] bg-contain text-xs flex items-center px-2">
            <div className="pl-2 pr-3 font-bold">1</div>
            <img src="/assets/no-profile.png" className="w-8 h-8 mx-1.5"></img>
            <img src="/assets/default.svg" className="w-4 h-4 mr-1"></img>
            <div className="font-bold mr-auto">김춘식1</div>
            <div className="text-[0.625rem] pr-6">03.24.123</div>
            <div className="text-[0.625rem] px-3">5/5</div>
          </div>
        </>
        <div className="my-4 mx-auto">
          <Button
            label="00 : 00 : 00"
            variant="secondary"
            className="w-64 h-12 text-2xl flex mx-auto rounded-xl font-normal"
          />
          <div className="flex-col items-center m-2">
            {!token ? (
              <div className="flex text-text-secondary text-sm">
                <div>회원만 참여할 수 있어요. &nbsp;</div>
                <a href="/login"> 로그인하러가기</a>
              </div>
            ) : (
              <>
                <div className="text-text-primary text-sm text-center">
                  <b>🚨 제출하기 버튼</b>을 꼭 눌러주세요!
                </div>
                <div className="text-text-secondary text-xs text-center">
                  제출하기 버튼을 누르지 않은 경우 랭킹에 반영되지 않습니다.
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
