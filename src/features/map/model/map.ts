import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { KTB } from '@/src/features/map/config/map';

export type LatLng = { lat: number; lng: number };
interface MapStore {
  center: LatLng | undefined;
  zoom: number | undefined;
  setCenter: (_center: LatLng) => void;
  setZoom: (_zoom: number) => void;
}

export const useMapStore = create<MapStore>()(
  persist(
    (set) => ({
      center: { lat: KTB.lat, lng: KTB.lng },
      zoom: 5,
      setCenter: (center: LatLng) => set({ center }),
      setZoom: (zoom: number) => set({ zoom }),
    }),
    {
      name: 'map-storage', // sessionStorage 키
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
