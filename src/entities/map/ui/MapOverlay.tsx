'use client';

import { MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import CompanyCard from '@/src/entities/map/ui/CompanyCard';
import markerFallback from '@/src/entities/map/assets/marker-fallback.svg';
import { useCompanyStore } from '@/src/shared/lib/company';
import { useAuthStore } from '@/src/entities/auth/model/auth';
import { useCompanyCardController } from '@/src/features/map/api/useCompanyCardController';
import { CompanyProps } from '@/src/entities/map/model/company';

import { useEffect, useState } from 'react';

interface MapOverlayProps {
  company: CompanyProps;
  index: number;
  isOpen: boolean;
  disabled: boolean;
  isHighlighted: boolean;
}

export default function MapOverlay({ company, isOpen, disabled, isHighlighted }: MapOverlayProps) {
  const { companyInfo, setOpenCardIndex, isBookmarked, setIsBookmarked } = useCompanyStore();
  const token = useAuthStore((state) => state.token);

  const position = {
    lat: company.locationInfo.latitude,
    lng: company.locationInfo.longitude,
  };

  const { fetchCompanyDetail } = useCompanyCardController(company.id);

  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = company.markerUrl;
    img.onload = () => setIsValid(true);
    img.onerror = () => setIsValid(false);
  }, [company.markerUrl]);

  return (
    <>
      {!disabled && (
        <MapMarker
          position={position}
          image={{
            src: isValid ? company.markerUrl : markerFallback.src,
            size: isHighlighted ? { width: 48, height: 66 } : { width: 37, height: 50 },
          }}
          clickable={true}
          onClick={fetchCompanyDetail}
          zIndex={isHighlighted ? 2 : 1}
        />
      )}
      {isOpen && companyInfo && (
        <CustomOverlayMap
          xAnchor={0.5}
          yAnchor={1.22}
          position={position}
          clickable={true}
          zIndex={30}
        >
          <CompanyCard
            companyId={companyInfo.id}
            companyName={companyInfo.name}
            bookmarkCount={companyInfo.wishCount}
            tags={companyInfo.keywords.slice(0, 4).map((k) => k.content) ?? []}
            imageUrl={companyInfo.logoUrl}
            isLoggedIn={!!token}
            onClose={() => setOpenCardIndex(null)}
            {...(token
              ? {
                  isBookmarked: isBookmarked,
                }
              : {
                  isBookmarked: false,
                })}
            setIsBookmarked={setIsBookmarked}
          />
        </CustomOverlayMap>
      )}
    </>
  );
}
