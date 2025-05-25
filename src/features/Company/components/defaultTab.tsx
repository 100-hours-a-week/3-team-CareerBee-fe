import {
  PiMapPin,
  PiUsers,
  PiLink,
  PiMegaphone,
  PiBuildings,
  PiCurrencyCircleDollar,
  PiMoneyWavy,
} from 'react-icons/pi';
import { Company } from '@/features/Company/CompanyDetail';
interface Props {
  company: Company;
}

const formatFinancials = (amount: number) => {
  if (!amount || amount <= 0) return '-';

  const trillion = Math.floor(amount / 1_0000_0000_0000);
  const billion = Math.floor((amount % 1_0000_0000_0000) / 1_0000_0000);
  const million = Math.floor((amount % 1_0000_0000) / 1_0000);

  const comma = (n: number) => n.toLocaleString();

  if (trillion > 0) {
    return `${comma(trillion)}조 ${billion > 0 ? `${comma(billion)}억` : ''}`;
  } else if (billion > 0) {
    return `${comma(billion)}억 ${million > 0 ? `${comma(million)}만` : ''}`;
  } else {
    return `${comma(million)}만`;
  }
};

export default function DefaultTab({ company }: Props) {
  return (
    <div className="px-2">
      <div className="flex gap-2 py-2 [&_svg]:size-5">
        <PiMapPin className="min-w-[18px]" />{' '}
        <p className="line-clamp-2 break-all">{company.address}</p>
      </div>
      <div className="flex gap-2 py-2 [&_svg]:size-5">
        <PiUsers className="min-w-[18px]" />{' '}
        {company.employeeCount > 0 ? `${company.employeeCount.toLocaleString()}명` : '-'}
      </div>
      <div className="flex gap-2 py-2 [&_svg]:size-5">
        <PiLink className="min-w-[18px]" />
        {company.homepageUrl ? (
          <a
            href={company.homepageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="line-clamp-2 break-all underline hover:text-border"
          >
            {company.homepageUrl}
          </a>
        ) : (
          <p> - </p>
        )}
      </div>
      <div className="flex gap-2 py-2 [&_svg]:size-5 ">
        <PiMegaphone className="min-w-[18px]" /> {company.description}
      </div>
      <div className="flex gap-2 pt-2 [&_svg]:size-5">
        <PiBuildings className="min-w-[18px]" />
        <p>기업형태</p>
      </div>
      <div className="flex gap-2 pb-2 [&_svg]:size-5 px-7">
        {
          {
            ENTERPRISE: '대기업',
            MID_SIZED: '중견기업',
            SME: '중소기업',
          }[company.companyType]
        }
      </div>
      <div className="flex gap-2 pt-2 [&_svg]:size-5">
        <PiCurrencyCircleDollar className="min-w-[18px]" />
        <p>매출액</p>
      </div>
      <div className="flex gap-2 pb-2 [&_svg]:size-5 px-7">
        {formatFinancials(company.financials.revenue)}
      </div>
      <div className="flex gap-2 pt-2 [&_svg]:size-5">
        <PiMoneyWavy className="min-w-[18px]" />
        <p>영업이익</p>
      </div>
      <div className="flex gap-2 pb-2 [&_svg]:size-5 px-7">
        {formatFinancials(company.financials.operatingProfit)}
      </div>
    </div>
  );
}
