import { create } from 'zustand';
import { KTB } from '@/features/Map/config/map';
import { persist } from 'zustand/middleware';

type LatLng = { lat: number; lng: number };
interface MapStore {
  center: LatLng;
  zoom: number;
  setCenter: (_center: LatLng) => void;
  setZoom: (_zoom: number) => void;
}

export const useMapStore = create<MapStore>()(
  persist(
    (set) => ({
      center: { lat: KTB.lat, lng: KTB.lng }, // default
      zoom: 5,
      setCenter: (center: LatLng) => set({ center }),
      setZoom: (zoom: number) => set({ zoom }),
    }),
    {
      name: 'map-storage', // localStorage 키
    },
  ),
);
