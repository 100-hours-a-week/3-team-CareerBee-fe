'use client';

import ProgressBar from '@/src/features/resume/form/ui/ProgressBar';
import SubmitButton from '@/src/features/resume/form/ui/SubmitButton';

import Dropdown from '@/src/widgets/ui/dropdown';
import DoubleDropdown from '@/src/widgets/ui/double-dropdown';
import { RadioGroup, RadioGroupItem } from '@/src/widgets/ui/radio-group';
import NumberForm from '@/src/features/resume/form/ui/numberForm';
import TextForm from '@/src/features/resume/form/ui/textForm';
import LongTextForm from '@/src/features/resume/form/ui/longtextForm';

import { useSubmitResume } from '@/src/features/resume/form/api/useSubmitResume';
import { useResumeStore } from '@/src/features/resume/upload/model/resumeStore';

import { baekjoonTierItems } from '@/src/features/resume/form/model/baekjoonTierItems';

import { cn } from '@/src/shared/lib/utils';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';

export const Form = () => {
  const { resume } = useResumeStore();
  const {
    control,
    handleSubmit: rhfHandleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      position: '',
      tier: '',
      certification_count: resume?.certificationCount ?? undefined,
      project_count: resume?.projectCount ?? undefined,
      major_type: resume?.majorType ?? undefined,
      work_period: resume?.workPeriod ?? undefined,
      role: resume?.position ?? undefined,
      additional_experiences: resume?.additionalExperiences ?? undefined,
    },
    mode: 'onChange',
  });

  const [visibleFields, setVisibleFields] = useState({
    tier: false,
    certification_count: false,
    project_count: false,
    major_type: false,
    work: false,
  });

  const watchedValues = watch([
    'position',
    'tier',
    'certification_count',
    'project_count',
    'major_type',
  ]);
  let isReady = false;
  useEffect(() => {
    isReady = Object.values(watchedValues).every((v) => v !== '' && v !== undefined);
  }, [watchedValues]);

  const watchedPosition = watch('position');
  const watchedTier = watch('tier');
  const watchedCert = watch('certification_count');
  const watchedProject = watch('project_count');
  const watchedMajor = watch('major_type');

  useEffect(() => {
    setVisibleFields({
      tier: Boolean(watchedPosition),
      certification_count: Boolean(watchedTier),
      project_count: watchedCert !== undefined,
      major_type: watchedProject !== undefined,
      work: watchedMajor !== undefined,
    });
  }, [watchedPosition, watchedTier, watchedCert, watchedProject, watchedMajor]);

  const { handleSubmit } = useSubmitResume();

  return (
    <form onSubmit={rhfHandleSubmit((data) => handleSubmit(data))}>
      <div className="flex flex-col gap-2 w-full">
        {/* 선호 직무 */}
        <div className="flex flex-col w-full gap-1">
          <p className="text-sm font-medium">선호 직무*</p>
          <Controller
            control={control}
            name="position"
            render={({ field }) => (
              <Dropdown
                {...field}
                placeholder="선호 직무"
                items={[
                  { label: '프론트엔드', value: 'FRONTEND' },
                  { label: '백엔드', value: 'BACKEND' },
                  { label: 'AI', value: 'AI' },
                  { label: '클라우드(DevOps)', value: 'DEVOPS' },
                ]}
              />
            )}
          />
        </div>

        {/* 백준 티어 */}
        {visibleFields.tier && (
          <div className="flex flex-col w-full gap-1">
            <p className="text-sm font-medium">백준 티어*</p>
            <Controller
              control={control}
              name="tier"
              render={({ field }) => (
                <DoubleDropdown {...field} placeholder="백준 티어" items={baekjoonTierItems} />
              )}
            />
          </div>
        )}

        {/* IT 자격증 개수 */}
        {visibleFields.certification_count && (
          <NumberForm
            title="IT 자격증 개수*"
            controllerName="certification_count"
            rules={{
              required: '0~50 사이의 숫자를 입력해주세요.',
              min: [0, '0 이상 입력해주세요.'],
              max: [50, '50 이하까지만 입력 가능합니다.'],
            }}
            placeholder="숫자를 입력해주세요."
            control={control}
            errors={errors.certification_count}
          />
        )}

        {/* 프로젝트 개수 */}
        {visibleFields.project_count && (
          <NumberForm
            title="프로젝트 개수*"
            controllerName="project_count"
            rules={{
              required: '0~10 사이의 숫자를 입력해주세요.',
              min: [0, '0 이상 입력해주세요.'],
              max: [10, '10 이하까지만 입력 가능합니다.'],
            }}
            placeholder="이력서에 추가할 프로젝트 개수를 입력해주세요."
            control={control}
            errors={errors.project_count}
          />
        )}

        {/* 전공자/비전공자 */}
        {visibleFields.major_type && (
          <div className="flex flex-col w-full gap-1">
            <div className="text-sm flex w-full">
              <p className=" font-medium mr-auto">전공자/비전공자*</p>
            </div>
            <Controller
              control={control}
              name="major_type"
              render={({ field }) => (
                <RadioGroup
                  className="flex space-x-6"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <div className="flex items-center space-x-2 p-1">
                    <RadioGroupItem value={'MAJOR'} id={'MAJOR'} className="min-h-5 min-w-5" />
                    <label htmlFor={'MAJOR'} className={cn(`cursor-pointer`)}>
                      전공자
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 p-1">
                    <RadioGroupItem
                      value={'NON_MAJOR'}
                      id={'NON_MAJOR'}
                      className="min-h-5 min-w-5"
                    />
                    <label htmlFor={'NON_MAJOR'} className={cn(`cursor-pointer`)}>
                      비전공자
                    </label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>
        )}

        {visibleFields.work && (
          <>
            <p className="text-xs font-medium">
              이직을 희망하시는 경우,
              <br />
              가장 최근 경력을 기준으로 기입해주세요!
            </p>

            {/* 근무 기간 */}
            <NumberForm
              title="근무 기간"
              controllerName="work_period"
              rules={{
                min: [1, '1 이상 입력해주세요.'],
                max: [999, '999 이하까지만 입력 가능합니다.'],
              }}
              placeholder="월 단위로 입력해주세요."
              control={control}
              errors={errors.work_period}
            />

            {/* 직무 */}
            <TextForm
              title="직무"
              controllerName="role"
              rules={{
                maxLength: [25, '입력을 확인해주세요. (최대 25자)'],
              }}
              placeholder="담당 직무를 입력해주세요."
              control={control}
              errors={errors.role}
            />

            {/* 기타 어필 */}
            <LongTextForm
              title="기타 어필"
              controllerName="additional_experiences"
              rules={{
                maxLength: [100, '입력을 확인해주세요. (최대 100자)'],
              }}
              placeholder="TOPCIT, 수상이력, 기술 스터디, 대회 참가 이력..."
              control={control}
              errors={errors.additional_experiences}
            />
          </>
        )}
      </div>
      <ProgressBar values={watchedValues} />
      <SubmitButton isReady={isReady} />
    </form>
  );
};

export default Form;
