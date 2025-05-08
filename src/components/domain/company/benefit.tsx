import { PiCardholder, PiSuitcaseRolling, PiTrain, PiChalkboardTeacher, PiHeartbeat, PiDotsThreeCircle } from "react-icons/pi";
import { CompanyBenefit } from "@/pages/CompanyDetail";

const BENEFIT_TYPE_MAP: Record<number, { label: string; icon: JSX.Element }> = {
    1: { label: '보상/수당', icon: <PiCardholder /> },
    2: { label: '휴가/휴직', icon: <PiSuitcaseRolling /> },
    3: { label: '교통/식사', icon: <PiTrain /> },
    4: { label: '교육/행사', icon: <PiChalkboardTeacher /> },
    5: { label: '생활/건강', icon: <PiHeartbeat /> },
    6: { label: '기타', icon: <PiDotsThreeCircle /> },
};
  
interface Props {
    benefits: CompanyBenefit[];
}
  
export default function BenefitTab({ benefits }: Props) {
    console.log(benefits);
    return (
        <div>
        {Object.entries(BENEFIT_TYPE_MAP).map(([key, { label, icon }]) => {
          const benefit = benefits.find((b) => b.type === key);
          return (
            <div key={key} className="flex gap-4 mb-2 py-2 items-start">
              <div className="min-w-[120px] flex gap-2  [&_svg]:size-5 items-center">
                {icon}
                <p>{label}</p>
              </div>
              <p className="grow">{benefit?.description || '-'}</p>
            </div>
          );
        })}
      </div>
    );
}
  
