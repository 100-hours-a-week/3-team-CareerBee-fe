import UploadTitle from '@/src/features/resume/ui/UploadTitle';
import UploadForm from '@/src/features/resume/ui/UploadForm';

export default function Page() {
  return (
    <>
      <div className="flex flex-col gap-8 py-3 px-16 w-full">
        <UploadTitle />
        <UploadForm />
      </div>
    </>
  );
}
