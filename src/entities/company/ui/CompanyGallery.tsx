import noImg from '@/public/images/no-image.png';

import { CompanyGalleryProps } from '@/src/entities/company/model/companyType';
//TODO Image 로 바꾸기
// import Image from 'next/image';

export const CompanyGallery = ({ company }: { company: CompanyGalleryProps }) => {
  return (
    <div className="relative grid grid-cols-4 grid-rows-2 gap-1 max-w-full h-56 mx-auto">
      {[...Array(5)].map((_, index) => {
        const photo = company.photos?.[index];
        const imageUrl = photo?.url ?? noImg.src;
        return (
          <div
            key={index}
            className={
              index === 0 ? 'col-span-2 row-span-2 relative aspect-[4/3]' : 'relative aspect-[4/3]'
            }
          >
            <img
              src={imageUrl}
              alt={company.name ?? 'no image'}
              // fill
              // className="rounded-lg object-cover"
              // sizes={
              //   index === 0 ? '(max-width: 600px) 100vw, 400px' : '(max-width: 600px) 50vw, 200px'
              // }
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        );
      })}
    </div>
  );
};

export default CompanyGallery;
