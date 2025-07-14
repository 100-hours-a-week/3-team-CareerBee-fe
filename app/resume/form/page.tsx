import FormTitle from '@/src/features/resume/form/ui/FormTitle';
import Form from '@/src/features/resume/form/ui/Form';

export default function Page() {
  return (
    <div className="flex flex-col py-3 px-16 w-full mb-auto gap-4 overflow-y-auto">
      <FormTitle />
      <Form />
    </div>
  );
}
