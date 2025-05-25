import BarChart from '@/features/Competition/chart';
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '../Member/store/auth';

export default function Ranking() {
  const token = useAuthStore((state) => state.token);

  return (
    <>
      <div className="flex justify-between items-center px-6">
        <PiCaretLeft className="w-7 h-7" />
        <div className="font-ria font-bold text-[2rem]">오늘의 TOP10</div>
        <PiCaretRight className="w-7 h-7" />
      </div>
      <div className="flex flex-col justify-center items-center mt-8">
        <>
          <div className="flex mx-auto">
            <BarChart></BarChart>
          </div>
          <div className="mb-1">. . .</div>
          <div className="w-[440px] h-[40px] rounded-md flex bg-[url('/assets/red-rank.svg')] object-contain text-sm flex items-center px-2">
            <div className="px-2 font-bold">1</div>
            <img src="/assets/no-profile.png" className="w-8 h-8 mx-2"></img>
            <img src="/assets/no-profile.png" className="w-4 h-4 mx-1"></img>
            <div className="font-bold mr-auto">나</div>
            <div className="text-xs pr-8">02.24.123</div>
            <div className="text-xs px-4">5/5</div>
          </div>
        </>
        <div className="my-8 mx-auto">
          <Button
            label="00 : 00 : 00"
            variant="secondary"
            className="w-64 h-12 text-2xl flex mx-auto rounded-lg font-normal"
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
    </>
  );
}
