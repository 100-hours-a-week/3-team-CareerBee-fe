import Form from '@/src/entities/resume/download/ui/Form';
import FormTitle from '@/src/entities/resume/download/ui/FormTitle';
import AILoading from '@/src/shared/ui/AILoading';

export default function Page() {
  return (
    <div className="flex flex-col py-3 px-16 w-full mb-auto gap-4 overflow-y-auto">
      <AILoading />
      <FormTitle />
      <Form />
    </div>
  );
}
