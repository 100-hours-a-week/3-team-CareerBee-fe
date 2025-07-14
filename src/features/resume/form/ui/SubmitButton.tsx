import { Button } from '@/src/widgets/ui/button';

export const SubmitButton = ({ isReady }: { isReady: boolean }) => {
  return (
    <div className="flex w-full justify-center mt-10">
      <Button type="submit" disabled={!isReady} label="저장" className="rounded-lg w-44" />
    </div>
  );
};

export default SubmitButton;
