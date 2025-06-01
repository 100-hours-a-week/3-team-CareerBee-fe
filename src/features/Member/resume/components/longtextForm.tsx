import { Textarea } from '@/components/ui/textarea';

import { Control, FieldError, Controller } from 'react-hook-form';

interface ResumeFormValues {
  job: string;
  tier: string;
  cert: string;
  project: string;
  major: string;
  workPeriod: string;
  role: string;
  appeal: string;
}
interface rulesProps {
  required: string;
  maxLength: [number, string];
}
interface formProps {
  title: string;
  controllerName: 'appeal';
  rules: rulesProps;
  placeholder: string;
  control: Control<ResumeFormValues>;
  errors?: FieldError;
}

export default function LongTextForm({
  title,
  controllerName,
  rules,
  placeholder,
  control,
  errors,
}: formProps) {
  return (
    <div className="flex flex-col w-full gap-1">
      <div className="text-sm flex w-full">
        <p className=" font-medium mr-auto">{title}</p>
        {errors && <p className="text-xs text-error font-medium">{errors.message}</p>}
      </div>
      <Controller
        control={control}
        name={controllerName}
        rules={{
          required: rules.required,
          maxLength: { value: rules.maxLength[0], message: rules.maxLength[1] },
        }}
        render={({ field }) => {
          return (
            <Textarea
              {...field}
              variant="default"
              placeholder={placeholder}
              maxLength={rules.maxLength[0]}
            />
          );
        }}
      />
    </div>
  );
}
