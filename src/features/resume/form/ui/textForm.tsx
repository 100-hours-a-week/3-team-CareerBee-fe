import { Input } from '@/src/widgets/ui/input';

import { formProps } from '@/src/features/resume/form/model/formProps';

import { Controller } from 'react-hook-form';

export default function TextForm({
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
          maxLength: rules.maxLength
            ? { value: rules.maxLength[0], message: rules.maxLength[1] }
            : undefined,
        }}
        render={({ field }) => {
          return (
            <Input
              {...field}
              value={field.value ?? ''}
              type="text"
              variant="resume"
              placeholder={placeholder}
            />
          );
        }}
      />
    </div>
  );
}
