import { Textarea } from '@/src/widgets/ui/textarea';

import { formProps } from '@/src/features/resume/form/model/formProps';

import { cn } from '@/src/shared/lib/utils';
import { Controller } from 'react-hook-form';

export default function LongTextForm({
  title,
  controllerName,
  rules,
  placeholder,
  control,
  errors,
  mainQuestion = false,
}: formProps) {
  return (
    <div className="flex flex-col w-full gap-1">
      <div className="text-sm flex w-full">
        <p className={cn('mr-auto font-medium', mainQuestion ? 'font-bold text-lg' : '')}>
          {title}
        </p>
        {!mainQuestion && errors && (
          <p className="text-xs text-error font-medium">{errors.message}</p>
        )}
      </div>
      <Controller
        control={control}
        name={controllerName}
        rules={{
          required: rules.required,
          maxLength: rules.maxLength
            ? { value: rules.maxLength[0], message: rules.maxLength[1] }
            : undefined,
          minLength: rules.minLength
            ? { value: rules.minLength[0], message: rules.minLength[1] }
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
              minLength={rules.minLength ? rules.minLength[0] : 0}
            />
          );
        }}
      />
      <div className="text-sm flex w-full">
        {mainQuestion && errors ? (
          <p className="text-xs text-error font-medium pt-1">{errors.message}</p>
        ) : (
          <div className="h-5"></div>
        )}
      </div>
    </div>
  );
}
