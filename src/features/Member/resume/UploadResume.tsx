import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textbox';
import Dropdown from '@/components/ui/dropdown';

export default function UploadResume() {
  return (
    <div className="flex flex-col py-3 px-16 w-full mb-auto gap-4">
      <div className="flex flex-col">
        <div className="text-base font-bold w-full items-start">
          진척도 조회를 위해 정보를 입력해주세요.
        </div>
        <p className="text-xs text-text-secondary">해당 정보는 참고용입니다.</p>
      </div>
      <form>
        <div className="flex flex-col gap-2 w-full">
          {/* 선호 직무 */}
          <div className="flex flex-col w-full gap-1">
            <p className="text-sm font-medium">선호 직무*</p>
            <Dropdown
              placeholder="선호 직무"
              items={[
                { label: '프론트엔드', value: 'FE' },
                { label: '백엔드', value: 'BE' },
                { label: 'AI', value: 'AI' },
                { label: '클라우드(DevOps)', value: 'CLOUD' },
              ]}
              // onChange={(value) => setSelectedReason(value)}
            />
          </div>

          {/* 백준 티어 */}
          <div className="flex flex-col w-full gap-1">
            <p className="text-sm font-medium">백준 티어*</p>
            <Dropdown
              placeholder="백준 티어"
              items={[
                { label: '프론트엔드', value: 'FE' },
                { label: '백엔드', value: 'BE' },
                { label: 'AI', value: 'AI' },
                { label: '클라우드(DevOps)', value: 'CLOUD' },
              ]}
              // onChange={(value) => setSelectedReason(value)}
            />
          </div>

          {/* IT 자격증 개수 */}
          <div className="flex flex-col w-full gap-1">
            <div className="text-sm flex w-full">
              <p className=" font-medium mr-auto">IT 자격증 개수*</p>
              <p title="helper-text" className="font-medium text-error">
                *helper text
              </p>
            </div>
            <Input
              variant="resume"
              placeholder="숫자를 입력해주세요."
              onChange={(e) => {
                // setNickname(e.target.value);
              }}
            />
          </div>

          {/* 프로젝트 개수 */}
          <div className="flex flex-col w-full gap-1">
            <div className="text-sm flex w-full">
              <p className=" font-medium mr-auto">프로젝트 개수*</p>
              <p title="helper-text" className="font-medium text-error">
                *helper text
              </p>
            </div>
            <Input
              variant="resume"
              placeholder="이력서에 추가할 프로젝트 개수를 입력해주세요."
              onChange={(e) => {
                // setNickname(e.target.value);
              }}
            />
          </div>

          {/* 근무 기간 */}
          <div className="flex flex-col w-full gap-1">
            <div className="text-sm flex w-full">
              <p className=" font-medium mr-auto">근무 기간</p>
              <p title="helper-text" className="font-medium text-error">
                *helper text
              </p>
            </div>
            <Input
              variant="resume"
              placeholder="월 단위로 입력해주세요."
              onChange={(e) => {
                // setNickname(e.target.value);
              }}
            />
          </div>

          {/* 직무 */}
          <div className="flex flex-col w-full gap-1">
            <div className="text-sm flex w-full">
              <p className=" font-medium mr-auto">직무</p>
              <p title="helper-text" className="font-medium text-error">
                *helper text
              </p>
            </div>
            <Input
              variant="resume"
              placeholder="담당 직무를 입력해주세요."
              onChange={(e) => {
                // setNickname(e.target.value);
              }}
            />
          </div>

          {/* 기타 어필 */}
          <div className="flex flex-col w-full gap-1">
            <div className="text-sm flex w-full">
              <p className=" font-medium mr-auto">직무</p>
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
      </form>
    </div>
  );
}
