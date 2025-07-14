import { ResumeFormProps } from '@/src/features/resume/form/model/resumeStore';

import { Control, FieldError } from 'react-hook-form';

export interface rulesProps {
  required?: string;
  maxLength?: [number, string];
  min?: [number, string];
  max?: [number, string];
}

type inputType =
  | 'certificationCount'
  | 'projectCount'
  | 'companyName'
  | 'workPeriod'
  | 'position'
  | 'additionalExperiences';
export interface formProps {
  title: string;
  controllerName: inputType;
  rules: rulesProps;
  placeholder: string;
  control: Control<ResumeFormProps>;
  errors?: FieldError;
}
