import { Input } from '@/components/ui/input';

import { ResumeFormValues } from '@/features/Member/resume/resumeForm';

import { Control, FieldError, Controller } from 'react-hook-form';

interface rulesProps {
  required?: string;
  min: [number, string];
  max: [number, string];
}
interface formProps {
  title: string;
  controllerName: 'certification_count' | 'project_count' | 'work_period';
  rules: rulesProps;
  placeholder: string;
  control: Control<ResumeFormValues>;
  errors?: FieldError;
}

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
          min: { value: rules.min[0], message: rules.min[1] },
          max: { value: rules.max[0], message: rules.max[1] },
        }}
        render={({ field }) => {
          return (
            <Input
              {...field}
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
                if (value < rules.min[0] || value > rules.max[0]) {
                  field.onChange('');
                } else {
                  field.onChange(e);
                }
              }}
            />
          );
        }}
      />
    </div>
  );
}
