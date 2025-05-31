import { Button } from '@/components/ui/button';
import Dropdown from '@/components/ui/dropdown';

export default function Quit() {
  return (
    <div className="flex flex-col gap-6 py-3 px-16 w-full mb-auto">
      <div className="text-xl font-bold w-full items-start">회원 탈퇴를 진행할게요.</div>
      <div className="flex w-full justify-center">
        <img src="/assets/logo.png" className="w-28" alt="커리어비 로고" />
      </div>
      <div className=" flex flex-col gap-1 text-sm font-medium">
        <p className="text-center">그동안 함께해 주셔서 감사합니다.🙇</p>
        <p className="text-center">
          마지막으로 탈퇴 사유를 알려주시면, 더 나은 서비스로 보답하겠습니다.
        </p>
      </div>
      <div className="flex w-full">
        <Dropdown
          placeholder="탈퇴 이유를 알려주세요."
          items={[
            { label: '서비스를 자주 이용하지 않아요.', value: 'not-frequent' },
            { label: '원하는 기능이 없어요.', value: 'no-feature' },
            { label: '사용이 불편해요.', value: 'inconvenient' },
            { label: '개인정보가 걱정돼요.', value: 'privacy' },
            { label: '기타', value: 'other' },
          ]}
        />
      </div>
      <div className="flex gap-6">
        <Button variant="primary" label="되돌아가기" className="w-full rounded-xl"></Button>
        <Button variant="secondary" label="탈퇴하기" className="w-full rounded-xl"></Button>
      </div>
    </div>
  );
}
