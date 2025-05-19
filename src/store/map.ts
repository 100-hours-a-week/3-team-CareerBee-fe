import { create } from 'zustand';
import { KTB } from '@/data/map';

type MapState = {
  center: { lat: number; lng: number };
  zoom: number;
  setCenter: (center: { lat: number; lng: number }) => void;
  setZoom: (zoom: number) => void;
};

export const useMapStore = create<MapState>((set) => ({
  center: { lat: KTB.lat, lng: KTB.lng },
  zoom: 3,
  setCenter: (center) => set({ center }),
  setZoom: (zoom) => set({ zoom }),
}));