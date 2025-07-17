import { Button } from '@/src/widgets/ui/button';

import { useUploadStore } from '@/src/features/resume/upload/model/uploadStore';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const UploadButton = ({ isReady }: { isReady: boolean }) => {
  const router = useRouter();
  const { isLoading } = useUploadStore();
  const [label, setLabel] = useState('완료');
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setLabel('추출 중...');
    } else if (label === '추출 중...') {
      router.push('/resume/form');
    }
  }, [isLoading]);

  return (
    <div className="flex gap-16 pt-12 w-full justify-center">
      <Button
        label="건너뛰기"
        variant="secondary"
        className="w-40"
        onClick={() => router.push('/resume/form')}
      />
      <Button
        type="submit"
        disabled={!isReady || submit}
        label={label}
        variant="primary"
        className="w-40"
        onClick={() => setSubmit(true)}
      />
    </div>
  );
};

export default UploadButton;
