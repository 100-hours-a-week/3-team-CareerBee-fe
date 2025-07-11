'use client';

import { Input } from '@/src/widgets/ui/input';

import { useUserInfo } from '@/src/features/member/model/useUserInfo';
import { useDirty } from '@/src/features/member/model/isDirtyContext';
import { useEffect } from 'react';

const NicknameInput = ({
  nickname,
  setNickname,
  setHelperText,
}: {
  nickname: string;
  setNickname: (_value: string) => void;
  setHelperText: (_value: string) => void;
}) => {
  const { data: userInfo } = useUserInfo();
  const { setIsNicknameDirty } = useDirty();

  useEffect(() => {
    const originalNickname = userInfo?.nickname ?? '닉네임';
    setIsNicknameDirty(nickname !== originalNickname && nickname != '');
  }, [nickname, userInfo]);

  return (
    <>
      <div>닉네임</div>
      <Input
        className="px-3 py-1"
        value={nickname}
        onChange={(e) => {
          const value = e.target.value;
          const space = /\s/;
          const pattern = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]*$/;

          if (value === '') {
            setNickname('');
            setHelperText('*닉네임을 입력해주세요.');
          } else if (value.length > 20) {
            setHelperText('*닉네임은 20자 이내로 입력해주세요.');
          } else if (space.test(value)) {
            setHelperText('*띄어쓰기는 사용할 수 없어요.');
          } else if (pattern.test(value)) {
            setNickname(value);
            setHelperText('*저장하기를 눌러주세요.');
          } else if (!(e.nativeEvent as InputEvent).isComposing) {
            setHelperText('*닉네임에는 한글, 영문, 숫자만 사용할 수 있어요.');
          }
        }}
      />
    </>
  );
};

export default NicknameInput;
