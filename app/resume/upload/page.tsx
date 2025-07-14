import UploadTitle from '@/src/features/resume/upload/ui/UploadTitle';
import UploadForm from '@/src/features/resume/upload/ui/Form';

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
