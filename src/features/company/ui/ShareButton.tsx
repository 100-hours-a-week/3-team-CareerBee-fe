'use client';

import { PiShare } from 'react-icons/pi';
import { Button } from '@/src/widgets/ui/button';

import { toast } from '@/src/shared/model/useToast';

export const ShareButton = () => {
  return (
    <Button
      variant="icon"
      label={<PiShare />}
      className="text-text-primary"
      onClick={() => {
        navigator.clipboard.writeText(window.location.href).then(() => {
          toast({ title: '링크가 복사되었습니다.', variant: 'success' });
        });
      }}
    />
  );
};

export default ShareButton;
