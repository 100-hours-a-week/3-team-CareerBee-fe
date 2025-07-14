import { ResumeFormProps } from '@/src/features/resume/form/model/resumeFormProps';

import { Control, FieldError } from 'react-hook-form';

export interface rulesProps {
  required?: string;
  maxLength?: [number, string];
  min?: [number, string];
  max?: [number, string];
}

type inputType =
  | 'certification_count'
  | 'project_count'
  | 'work_period'
  | 'role'
  | 'additional_experiences';
export interface formProps {
  title: string;
  controllerName: inputType;
  rules: rulesProps;
  placeholder: string;
  control: Control<ResumeFormProps>;
  errors?: FieldError;
}
