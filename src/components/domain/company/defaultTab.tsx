import { PiMapPin, PiUsers, PiLink, PiMegaphone, PiBuildings, PiCurrencyCircleDollar, PiMoneyWavy } from "react-icons/pi";
import { Company } from "@/pages/CompanyDetail";

interface Props {
    company: Company;
}
export default function DefaultTab({ company }: Props) {
    return (
      <div>
      <div className="flex gap-2 py-2 [&_svg]:size-5">
        <PiMapPin /> {company.address}
      </div>
      <div className="flex gap-2 py-2 [&_svg]:size-5">
        <PiUsers /> {`${company.employeeCount
            ? company.employeeCount.toLocaleString()
        : '- '}`} 
        <p>명</p>
      </div>
      <div className="flex gap-2 py-2 [&_svg]:size-5">
  {company.homepageUrl ? (
    <a
      href={company.homepageUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 underline hover:text-border"
    >
      <PiLink /> {company.homepageUrl}
    </a>
  ) : (
    <>
      <PiLink /> -
    </>
  )}
</div>
      <div className="flex gap-2 py-2 [&_svg]:size-9">
        <PiMegaphone /> {company.description} 
      </div>
      <div className="flex gap-2 py-2 [&_svg]:size-5">
        <PiBuildings />
        <p>기업형태<br/>{
          {
            ENTERPRISE: '대기업',
            MID_SIZED: '중견기업',
            SME: '중소기업',
          }[company.companyType]
        }</p>
      </div>
      <div className="flex gap-2 py-2 [&_svg]:size-5">
        <PiCurrencyCircleDollar />
        <p>매출액<br/>
          {`${company.financials.revenue
            ? (company.financials.revenue / 100000000).toLocaleString()
            : '- '
          }억원`}
        </p>
      </div>
      <div className="flex gap-2 py-2 [&_svg]:size-5">
        <PiMoneyWavy />
        <p>영업이익<br/>
          {`${company.financials.operatingProfit
            ? (company.financials.operatingProfit / 100000000).toLocaleString()
            : '- '
          }억원`}
        </p>
      </div>
      </div>
    );
  }
  
