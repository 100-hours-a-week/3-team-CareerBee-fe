import { Textarea } from '@/components/ui/textarea';
import Dropdown from '@/components/ui/dropdown';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import NumberForm from '@/features/Member/resume/components/numberForm';
import TextForm from '@/features/Member/resume/components/textForm';

import { cn } from '@/lib/utils';
import { useForm, Controller } from 'react-hook-form';

export default function UploadResume() {
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

  const watchedValues = watch(['job', 'tier', 'cert', 'project', 'major']);
  const isReady = Object.values(watchedValues).every((v) => v !== '');

  const submitForm = () => {
    window.location.href = '/resume/view';
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
          <div className="flex flex-col w-full gap-1">
            <p className="text-sm font-medium">백준 티어*</p>
            <Controller
              control={control}
              name="tier"
              render={({ field }) => (
                <Dropdown
                  {...field}
                  placeholder="백준 티어"
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

          {/* IT 자격증 개수 */}
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

          {/* 프로젝트 개수 */}
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

          {/* 전공자/비전공자 */}
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
              required: '1~999 사이의 숫자를 입력해주세요.',
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
              required: '입력을 확인해주세요. (최대 25자)',
              maxLength: [25, '입력을 확인해주세요. (최대 25자)'],
            }}
            placeholder="담당 직무를 입력해주세요."
            control={control}
            errors={errors.role}
          />

          {/* 기타 어필 */}
          <div className="flex flex-col w-full gap-1">
            <div className="text-sm flex w-full">
              <p className=" font-medium mr-auto">기타 어필</p>
              <p title="helper-text" className="font-medium text-error">
                *helper text
              </p>
            </div>
            <Textarea
              maxLength={100}
              placeholder="TOPCIT, 수상이력, 기술 스터디, 대회 참가 이력..."
              onChange={(e) => {
                // setNickname(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex w-full justify-center mt-10">
          <Button type="submit" disabled={!isReady} label="저장" className="rounded-lg w-44" />
        </div>
      </form>
    </div>
  );
}
