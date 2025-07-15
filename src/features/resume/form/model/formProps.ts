import { Control, FieldError } from 'react-hook-form';

export interface rulesProps {
  required?: string;
  maxLength?: [number, string];
  minLength?: [number, string];
  min?: [number, string];
  max?: [number, string];
}

type resumeType =
  | 'certificationCount'
  | 'projectCount'
  | 'companyName'
  | 'workPeriod'
  | 'position'
  | 'additionalExperiences'
  | 'question';

export interface formProps {
  title: string;
  controllerName: resumeType;
  rules: rulesProps;
  placeholder: string;
  control: Control<any>;
  errors?: FieldError;
}
