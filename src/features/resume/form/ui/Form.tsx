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
import { useResumeResultStore } from '@/src/features/resume/form/model/resumeStore';
import { findTier } from '@/src/entities/resume/download/lib/findTier';

import { baekjoonTierItems } from '@/src/features/resume/form/model/baekjoonTierItems';

import { cn } from '@/src/shared/lib/utils';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';

export const Form = () => {
  const { result } = useResumeResultStore();
  const {
    control,
    handleSubmit: rhfHandleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      preferredJob: result?.preferredJob ?? undefined,
      tier: result?.tier ?? undefined,
      certificationCount: result?.certificationCount ?? undefined,
      projectCount: result?.projectCount ?? undefined,
      majorType: result?.majorType ?? undefined,
      companyName: result?.companyName ?? undefined,
      workPeriod: result?.workPeriod ?? undefined,
      position: result?.position ?? undefined,
      additionalExperiences: result?.additionalExperiences ?? undefined,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    console.log(result);
    if (result) {
      reset({
        preferredJob: result?.preferredJob ?? undefined,
        tier: result?.tier ?? undefined,
        certificationCount: result?.certificationCount ?? undefined,
        projectCount: result?.projectCount ?? undefined,
        majorType: result?.majorType ?? undefined,
        companyName: result?.companyName ?? undefined,
        workPeriod: result?.workPeriod ?? undefined,
        position: result?.position ?? undefined,
        additionalExperiences: result?.additionalExperiences ?? undefined,
      });
    }
  }, [result, reset]);

  const [visibleFields, setVisibleFields] = useState({
    tier: false,
    certificationCount: false,
    projectCount: false,
    majorType: false,
    work: false,
  });

  const watchedValues = watch([
    'preferredJob',
    'tier',
    'certificationCount',
    'projectCount',
    'majorType',
  ]);

  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setIsReady(Object.values(watchedValues).every((v) => v !== '' && v !== undefined));
  }, [watchedValues]);

  const watchedPreferredJob = watch('preferredJob');
  const watchedTier = watch('tier');
  const watchedCert = watch('certificationCount');
  const watchedProject = watch('projectCount');
  const watchedMajor = watch('majorType');

  useEffect(() => {
    setVisibleFields({
      tier: Boolean(watchedPreferredJob),
      certificationCount: Boolean(watchedTier),
      projectCount: watchedCert !== undefined,
      majorType: watchedProject !== undefined,
      work: watchedMajor !== undefined,
    });
  }, [watchedPreferredJob, watchedTier, watchedCert, watchedProject, watchedMajor]);

  const { handleSubmit } = useSubmitResume();

  return (
    <form onSubmit={rhfHandleSubmit((data) => handleSubmit(data))}>
      <div className="flex flex-col gap-2 w-full">
        {/* 선호 직무 */}
        <div className="flex flex-col w-full gap-1">
          <p className="text-sm font-medium">선호 직무*</p>
          <Controller
            control={control}
            name="preferredJob"
            render={({ field }) => (
              <Dropdown
                placeholder="선호 직무"
                onChange={field.onChange}
                value={field.value}
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
                <DoubleDropdown
                  {...field}
                  placeholder="백준 티어"
                  value={field.value ? findTier(field.value) : ''}
                  items={baekjoonTierItems}
                />
              )}
            />
          </div>
        )}

        {/* IT 자격증 개수 */}
        {visibleFields.certificationCount && (
          <NumberForm
            title="IT 자격증 개수*"
            controllerName="certificationCount"
            rules={{
              required: '0~50 사이의 숫자를 입력해주세요.',
              min: [0, '0 이상 입력해주세요.'],
              max: [50, '50 이하까지만 입력 가능합니다.'],
            }}
            placeholder="숫자를 입력해주세요."
            control={control}
            errors={errors.certificationCount}
          />
        )}

        {/* 프로젝트 개수 */}
        {visibleFields.projectCount && (
          <NumberForm
            title="프로젝트 개수*"
            controllerName="projectCount"
            rules={{
              required: '0~10 사이의 숫자를 입력해주세요.',
              min: [0, '0 이상 입력해주세요.'],
              max: [10, '10 이하까지만 입력 가능합니다.'],
            }}
            placeholder="이력서에 추가할 프로젝트 개수를 입력해주세요."
            control={control}
            errors={errors.projectCount}
          />
        )}

        {/* 전공자/비전공자 */}
        {visibleFields.majorType && (
          <div className="flex flex-col w-full gap-1">
            <div className="text-sm flex w-full">
              <p className=" font-medium mr-auto">전공자/비전공자*</p>
            </div>
            <Controller
              control={control}
              name="majorType"
              render={({ field }) => (
                <RadioGroup
                  className="flex space-x-6"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {[
                    { value: 'MAJOR', label: '전공자' },
                    { value: 'NON_MAJOR', label: '비전공자' },
                  ].map(({ value, label }) => (
                    <div key={value} className="flex items-center space-x-2 p-1">
                      <RadioGroupItem value={value} id={value} className="min-h-5 min-w-5" />
                      <label htmlFor={value} className={cn('cursor-pointer')}>
                        {label}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
          </div>
        )}

        {visibleFields.work && (
          <>
            <p className="mt-2 text-xs font-medium">가장 최근 경력을 기준으로 기입해주세요!</p>

            {/* 기업명 */}
            <TextForm
              title="기업명"
              controllerName="companyName"
              rules={{
                maxLength: [25, '입력을 확인해주세요. (최대 25자)'],
              }}
              placeholder="기업명을 입력해주세요."
              control={control}
              errors={errors.companyName}
            />

            {/* 근무 기간 */}
            <NumberForm
              title="근무 기간"
              controllerName="workPeriod"
              rules={{
                min: [1, '1 이상 입력해주세요.'],
                max: [999, '999 이하까지만 입력 가능합니다.'],
              }}
              placeholder="월 단위로 입력해주세요."
              control={control}
              errors={errors.workPeriod}
            />

            {/* 직무 */}
            <TextForm
              title="직무"
              controllerName="position"
              rules={{
                maxLength: [25, '입력을 확인해주세요. (최대 25자)'],
              }}
              placeholder="담당 직무를 입력해주세요."
              control={control}
              errors={errors.position}
            />

            {/* 기타 어필 */}
            <LongTextForm
              title="기타 어필"
              controllerName="additionalExperiences"
              rules={{
                maxLength: [100, '입력을 확인해주세요. (최대 100자)'],
              }}
              placeholder="TOPCIT, 수상이력, 기술 스터디, 대회 참가 이력..."
              control={control}
              errors={errors.additionalExperiences}
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
