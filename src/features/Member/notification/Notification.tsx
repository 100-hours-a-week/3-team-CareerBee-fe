import Notify from '@/features/Member/notification/components/notify';

export default function Notification() {
  return (
    <>
      <div className="flex flex-col items-center justify-center mx-5 py-2 border-b-2 border-text-secondary/60">
        <div className="flex mr-auto mb-2">중요한 알림</div>
        <Notify
          title="공채 알림"
          description="저장하신 (주)카카오사의 채용 공고를 확인해보세요!"
          time="오후 4시 4분"
        />
      </div>
      <div className="flex flex-col items-center justify-center mx-5 py-2 border-b-2 border-text-secondary/60">
        <div className="flex mr-auto mb-2">기본 알림</div>
        <Notify
          title="CS 대회"
          description="김춘식님이 오늘의 CS 대회에서 1위를 달성했어요!"
          time="오후 4시 4분"
        />
      </div>
    </>
  );
}
