import { create } from 'zustand';

export interface markerProps {
  id: number;
  markerUrl: string;
  businessType: string;
  recruitingStatus: string;
  locationInfo: {
    latitude: number;
    longitude: number;
  };
}

interface MarkerStore {
  companyDisabledMap: Record<number, boolean>;
  setCompanyDisabledMap: (_map: Record<number, boolean>) => void;
}

export const useMarkerStore = create<MarkerStore>((set) => ({
  companyDisabledMap: {},
  setCompanyDisabledMap: (map) => set({ companyDisabledMap: map }),
}));
