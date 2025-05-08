import { PiBriefcase } from "react-icons/pi";
import { Recruitment } from "@/pages/CompanyDetail";

interface Props {
    recruitments: Recruitment[];
}
export default function RecruitTab({ recruitments }: Props) {
    return (
      <div>
      <div className="flex gap-2 py-2 [&_svg]:size-5">
        <PiBriefcase /> 
        <p>현재 채용 정보</p>
      </div>
      {recruitments.length > 0
      ? (
        <ul className="space-y-2 px-7">
          { recruitments.map((recruitment) => (
            <li key={recruitment.id} className="border p-3 rounded-md">
              <a
                href={recruitment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold underline"
              >
                {recruitment.title}
              </a>
            </li>
          ))}
        </ul>
      )
      : (
        <p className="px-7">현재 채용 중이 아니에요.</p>
      )
      }
      </div>
    );
  }
  
