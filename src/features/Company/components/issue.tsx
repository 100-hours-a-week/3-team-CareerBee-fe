import { PiPresentationChart } from "react-icons/pi";

interface Props {
    name: string;
    issue: string | null;
  }
  
  export default function IssueTab({ name, issue }: Props) {
    return (
      <div className="px-2">
      <div className="flex gap-2 py-2 [&_svg]:size-5">
        <PiPresentationChart /> 
        <p>{`${name}의 사업 현황은?`}</p>
      </div>
      {issue 
      ? (
        <p className="px-7">{issue}</p>
      )
      : (
        <p>최근 이슈가 없어요.</p>
      )
      }
      </div>
    );
  }
  
