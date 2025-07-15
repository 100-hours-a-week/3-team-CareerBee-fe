import { Textarea } from '@/src/widgets/ui/textarea';

import { formProps } from '@/src/features/resume/form/model/formProps';

import { Controller } from 'react-hook-form';

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
          maxLength: rules.maxLength
            ? { value: rules.maxLength[0], message: rules.maxLength[1] }
            : undefined,
        }}
        render={({ field }) => {
          return (
            <Textarea
              {...field}
              value={field.value ?? ''}
              variant="default"
              placeholder={placeholder}
              maxLength={rules.maxLength ? rules.maxLength[0] : 0}
            />
          );
        }}
      />
    </div>
  );
}
