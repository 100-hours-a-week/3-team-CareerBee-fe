import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Correct from '@/features/Competition/image/correct.png';
import Incorrect from '@/features/Competition/image/incorrect.png';
import { cn } from '@/lib/utils';
import { Problem } from '../Competition';

type QuestionProps = {
  value: string;
  showExplanation: boolean;
  selectedValue: number;
  onChange: (_value: string) => void;
  problem: Problem;
};
export default function Question({
  value,
  showExplanation,
  selectedValue,
  onChange,
  problem,
}: QuestionProps) {
  return (
    <div className="relative">
      <div className="flex-col overflow-y-auto overflow-x-visible h-[31.25rem] px-3">
        {showExplanation ? (
          <div className="sticky flex items-start left-[-0.5rem] z-10">
            <img
              src={problem.answer === selectedValue ? Correct : Incorrect}
              className="absolute left-[-0.5rem] h-20"
              alt={problem.answer === selectedValue ? '정답' : '오답'}
            />
          </div>
        ) : null}
        <div className="relative">
          <div className="flex font-bold py-4">
            <div>0{value}.</div>
            <div className="pl-3">{problem.title}</div>
          </div>
          <div className="w-full mb-8">{problem.description}</div>
        </div>
        <>
          <RadioGroup
            defaultValue={selectedValue.toString()}
            className="flex flex-col space-y-6"
            value={selectedValue.toString()}
            onValueChange={onChange}
            disabled={showExplanation}
          >
            {problem.choices.map((option) => {
              const key = option.order.toString();
              return (
                <div key={key} className="flex items-center space-x-2 p-1">
                  <RadioGroupItem
                    value={key}
                    id={key}
                    isAnswer={problem.answer === option.order && showExplanation}
                    falseAnswer={
                      selectedValue === option.order &&
                      problem.answer !== selectedValue &&
                      showExplanation
                    }
                    trueAnswer={
                      selectedValue === option.order &&
                      problem.answer === selectedValue &&
                      showExplanation
                    }
                    className="min-h-5 min-w-5"
                  />
                  <label
                    htmlFor={key}
                    className={cn(`cursor-pointer`, showExplanation && 'cursor-default')}
                  >
                    {option.content}
                  </label>
                </div>
              );
            })}
          </RadioGroup>
        </>
        <>{showExplanation && <div className="mt-8">{problem.solution}</div>}</>
      </div>
    </div>
  );
}
