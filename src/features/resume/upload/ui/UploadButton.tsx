import { Button } from '@/src/widgets/ui/button';
import { useRouter } from 'next/navigation';

export const UploadButton = ({ isReady }: { isReady: boolean }) => {
  const router = useRouter();

  return (
    <div className="flex gap-16 pt-12 w-full justify-center">
      <Button
        label="건너뛰기"
        variant="secondary"
        className="w-40"
        onClick={() => router.push('/resume/form')}
      />
      <Button type="submit" disabled={!isReady} label="완료" variant="primary" className="w-40" />
    </div>
  );
};

export default UploadButton;
