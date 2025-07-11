import { PiStar, PiStarFill, PiStarHalfFill } from 'react-icons/pi';
import { CompanySummaryProps } from '@/src/entities/company/model/companyType';

export default function CompanySummary({ company }: { company: CompanySummaryProps }) {
  return (
    <div className="flex flex-col px-4 gap-2 my-2">
      <div className="text-lg font-semibold">{company.title}</div>
      <div className="flex gap-0.5 [&_svg]:size-5 text-primary ">
        {[...Array(5)].map((_, index) => {
          const full = Math.floor(company.rating);
          const decimal = company.rating - full;
          if (index < full) {
            return <PiStarFill key={index} />;
          } else if (index === full) {
            if (decimal < 0.333) return <PiStar key={index} />;
            if (decimal < 0.666) return <PiStarHalfFill key={index} />;
            return <PiStarFill key={index} />;
          } else {
            return <PiStar key={index} />;
          }
        })}
        <p className="ml-2 text-xs text-text-secondary mt-auto">캐치 종합 점수 기준</p>
      </div>
      <div className="w-full text-center font-semibold">
        {`평균: ${company.financials.annualSalary ? (company.financials.annualSalary / 10000).toLocaleString() : '-'}만원 / 신입: ${
          company.financials.startingSalary
            ? (company.financials.startingSalary / 10000).toLocaleString()
            : '-'
        }만원`}
      </div>
    </div>
  );
}
