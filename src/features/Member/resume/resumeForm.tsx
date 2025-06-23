import BeeImage from '@/features/Member/resume/image/bee.png';
import BeehiveImage from '@/features/Member/resume/image/beehive.png';

import Dropdown from '@/components/ui/dropdown';
import DoubleDropdown from '@/components/ui/double-dropdown';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import NumberForm from '@/features/Member/resume/components/numberForm';
import TextForm from '@/features/Member/resume/components/textForm';
import LongTextForm from '@/features/Member/resume/components/longtextForm';

import { baekjoonTierItems } from './config/baekjoonTierItems';

import { cn } from '@/lib/utils';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResumeForm() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      job: '',
      tier: '',
      cert: '',
      project: '',
      major: '',
      workPeriod: '',
      role: '',
      appeal: '',
    },
    mode: 'onChange',
  });

  const [visibleFields, setVisibleFields] = useState({
    tier: false,
    cert: false,
    project: false,
    major: false,
    work: false,
  });

  const watchedValues = watch(['job', 'tier', 'cert', 'project', 'major']);
  const isReady = Object.values(watchedValues).every((v) => v !== '');

  useEffect(() => {
    if (watch('job')) setVisibleFields((prev) => ({ ...prev, tier: true }));
    if (watch('tier')) setVisibleFields((prev) => ({ ...prev, cert: true }));
    if (watch('cert')) setVisibleFields((prev) => ({ ...prev, project: true }));
    if (watch('project')) setVisibleFields((prev) => ({ ...prev, major: true }));
    if (watch('major')) setVisibleFields((prev) => ({ ...prev, work: true }));
  }, [watch()]);

  const navigate = useNavigate();
  const submitForm = () => {
    navigate('/resume/download');
  };

  return (
    <div className="flex flex-col py-3 px-16 w-full mb-auto gap-4">
      <div className="flex flex-col">
        <div className="text-base font-bold w-full items-start">
          진척도 조회를 위해 정보를 입력해주세요.
        </div>
        <p className="text-xs text-text-secondary">해당 정보는 참고용입니다.</p>
      </div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-col gap-2 w-full">
          {/* 선호 직무 */}
          <div className="flex flex-col w-full gap-1">
            <p className="text-sm font-medium">선호 직무*</p>
            <Controller
              control={control}
              name="job"
              render={({ field }) => (
                <Dropdown
                  {...field}
                  placeholder="선호 직무"
                  items={[
                    { label: '프론트엔드', value: 'FE' },
                    { label: '백엔드', value: 'BE' },
                    { label: 'AI', value: 'AI' },
                    { label: '클라우드(DevOps)', value: 'CLOUD' },
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
          {visibleFields.cert && (
            <NumberForm
              title="IT 자격증 개수*"
              controllerName="cert"
              rules={{
                required: '0~50 사이의 숫자를 입력해주세요.',
                min: [0, '0 이상 입력해주세요.'],
                max: [50, '50 이하까지만 입력 가능합니다.'],
              }}
              placeholder="숫자를 입력해주세요."
              control={control}
              errors={errors.cert}
            />
          )}

          {/* 프로젝트 개수 */}
          {visibleFields.project && (
            <NumberForm
              title="프로젝트 개수*"
              controllerName="project"
              rules={{
                required: '0~10 사이의 숫자를 입력해주세요.',
                min: [0, '0 이상 입력해주세요.'],
                max: [10, '10 이하까지만 입력 가능합니다.'],
              }}
              placeholder="이력서에 추가할 프로젝트 개수를 입력해주세요."
              control={control}
              errors={errors.project}
            />
          )}

          {/* 전공자/비전공자 */}
          {visibleFields.major && (
            <div className="flex flex-col w-full gap-1">
              <div className="text-sm flex w-full">
                <p className=" font-medium mr-auto">전공자/비전공자*</p>
              </div>
              <Controller
                control={control}
                name="major"
                render={({ field }) => (
                  <RadioGroup
                    className="flex space-x-6"
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <div className="flex items-center space-x-2 p-1">
                      <RadioGroupItem value={'major'} id={'major'} className="min-h-5 min-w-5" />
                      <label htmlFor={'major'} className={cn(`cursor-pointer`)}>
                        전공자
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 p-1">
                      <RadioGroupItem
                        value={'nonMajor'}
                        id={'nonMajor'}
                        className="min-h-5 min-w-5"
                      />
                      <label htmlFor={'nonMajor'} className={cn(`cursor-pointer`)}>
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
                controllerName="appeal"
                rules={{
                  maxLength: [100, '입력을 확인해주세요. (최대 100자)'],
                }}
                placeholder="TOPCIT, 수상이력, 기술 스터디, 대회 참가 이력..."
                control={control}
                errors={errors.appeal}
              />
            </>
          )}
        </div>
        {/* 진척도 Progress Bar */}
        <div className="w-full mt-10 relative">
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-3 bg-primary transition-all duration-1000 rounded-full"
              style={{
                width: `${(Object.values(watchedValues).filter(Boolean).length / 5) * 100}%`,
              }}
            />
          </div>
          {/* Bee icon */}
          <img
            src={BeeImage}
            alt="bee"
            className="absolute top-[-1.75rem]"
            style={{
              left: `calc(${
                Object.values(watchedValues).filter(Boolean).length === 5
                  ? 92
                  : (Object.values(watchedValues).filter(Boolean).length / 5) * 100
              }% - 12px)`,
              transition: 'left 1s ease',
              height: '24px',
            }}
          />
          {/* Hive icon */}
          <img
            src={BeehiveImage}
            alt="hive"
            className="absolute top-[-1.75rem] right-0"
            style={{ height: '24px' }}
          />
        </div>
        <div className="flex w-full justify-center mt-10">
          <Button type="submit" disabled={!isReady} label="저장" className="rounded-lg w-44" />
        </div>
      </form>
    </div>
  );
}
