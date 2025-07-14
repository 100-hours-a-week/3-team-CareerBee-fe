import { Input } from '@/src/widgets/ui/input';

import { formProps } from '@/src/features/resume/form/model/formProps';

import { Controller } from 'react-hook-form';

export default function NumberForm({
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
          min: rules.min ? { value: rules.min[0], message: rules.min[1] } : undefined,
          max: rules.max ? { value: rules.max[0], message: rules.max[1] } : undefined,
        }}
        render={({ field }) => {
          return (
            <Input
              {...field}
              value={field.value ?? ''}
              type="number"
              step="1"
              inputMode="numeric"
              variant="resume"
              placeholder={placeholder}
              onKeyDown={(e) => {
                if (e.key === '.' || e.key === 'e' || e.key === '-' || e.key === '+') {
                  e.preventDefault();
                }
              }}
              onBlur={(e) => {
                const value = Number(e.target.value);
                if (
                  value < (rules.min ? rules.min[0] : 0) ||
                  value > (rules.max ? rules.max[0] : 0)
                ) {
                  field.onChange('');
                } else {
                  field.onChange(value);
                }
              }}
            />
          );
        }}
      />
    </div>
  );
}
