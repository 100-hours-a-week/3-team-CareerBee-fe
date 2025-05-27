import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const answers = [
  {
    id: 'radio1',
    value: 'radio1',
    label:
      '타임 슬라이스(Time Slice)를 일정하게 설정하고 각 프로세스가 정해진 시간 동안 CPU를 이동하여 대기하도록 하는 선점형 스케줄링 알고리즘은 무엇인지',
  },
  { id: 'radio2', value: 'radio2', label: 'Option Two' },
  { id: 'radio3', value: 'radio3', label: 'Option Three' },
  { id: 'radio4', value: 'radio4', label: 'Option Four' },
  { id: 'radio5', value: 'radio5', label: 'Option Five' },
];

export default function Question({ value }: { value: string }) {
  return (
    <div className="flex-col max-h-[36rem] overflow-auto">
      <>
        <div className="flex font-bold py-4">
          <div>0{value}.</div>
          <div className="pl-3">
            {' '}
            타임 슬라이스(Time Slice)를 일정하게 설정하고 각 프로세스가 정해진 시간 동안 CPU를
            이동하여 대기하도록 하는 선점형 스케줄링 알고리즘은 무엇인지{' '}
          </div>
        </div>
        <div className="w-full mb-8">
          타임 슬라이스(Time Slice)를 일정하게 설정하고 각 프로세스가 정해진 시간 동안 CPU를
          이동하여 대기하도록 하는 선점형 스케줄링 알고리즘은 무엇인지 고르세요타임 슬라이스(Time
          Slice)를 일정하게 설정하고 각 프로세스가 정해진 시간 동안 CPU를 이동하여 대기하도록 하는
          선점형 스케줄링 알고리즘은 무엇인
        </div>
      </>
      <>
        <RadioGroup className="flex flex-col space-y-6">
          {answers.map((option) => (
            <div key={option.id} className="flex items-center space-x-2 p-1">
              <RadioGroupItem value={option.value} id={option.id} className="min-h-5 min-w-5" />
              <label htmlFor={option.id} className="cursor-pointer">
                {option.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      </>
    </div>
  );
}
