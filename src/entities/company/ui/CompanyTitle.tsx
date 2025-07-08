import noImg from '@/public/images/no-image.png';

import BookmarkButton from '@/src/features/company/ui/BookmarkButton';
import ShareButton from '@/src/features/company/ui/ShareButton';
import { CompanyTitleProps } from '@/src/entities/company/model/companyType';

export default function CompanyTitle({ company }: { company: CompanyTitleProps }) {
  return (
    <div className="-mt-9 pl-2 relative z-10">
      <div className="flex items-center justify-end w-full px-2 text-2xl font-semibold">
        {/* 왼쪽 영역 */}
        <div className="flex gap-2 mr-auto">
          <img
            src={company.logoUrl || noImg.src}
            alt={`${company.name} 로고`}
            className="w-20 h-20 rounded-md object-contain border border-text-primary bg-white"
          />
          <div className="flex flex-col justify-end">
            <span>{company.name}</span>
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <div className="flex flex-col mt-auto gap-2">
          <div className="flex items-center gap-1 [&_svg]:size-6 bg-transparent">
            <ShareButton />
            <BookmarkButton companyId={company.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
