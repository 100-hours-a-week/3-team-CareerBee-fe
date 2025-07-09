import {
  PiCardholder,
  PiSuitcaseRolling,
  PiTrain,
  PiChalkboardTeacher,
  PiHeartbeat,
  PiDotsThreeCircle,
} from 'react-icons/pi';
import { CompanyBenefit } from '@/src/entities/company/model/companyType';
import type { JSX } from 'react';

type BenefitType =
  | 'COMPENSATION'
  | 'LEAVE'
  | 'TRANSPORT_MEALS'
  | 'WELLNESS'
  | 'EDUCATION_EVENTS'
  | 'ETC';

const BENEFIT_TYPE_MAP: Record<BenefitType, { label: string; icon: JSX.Element }> = {
  COMPENSATION: { label: '보상/수당', icon: <PiCardholder /> },
  LEAVE: { label: '휴가/휴직', icon: <PiSuitcaseRolling /> },
  TRANSPORT_MEALS: { label: '교통/식사', icon: <PiTrain /> },
  EDUCATION_EVENTS: { label: '교육/행사', icon: <PiChalkboardTeacher /> },
  WELLNESS: { label: '생활/건강', icon: <PiHeartbeat /> },
  ETC: { label: '기타', icon: <PiDotsThreeCircle /> },
};

interface Props {
  benefits: CompanyBenefit[];
}

export default function BenefitTab({ benefits }: Props) {
  return (
    <div className="px-2">
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
