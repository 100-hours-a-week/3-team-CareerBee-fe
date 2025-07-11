/* global kakao */

import { create } from 'zustand';

interface MapRefState {
  mapRef: kakao.maps.Map | null;
  setMapRef: (ref: kakao.maps.Map | null) => void;
}

export const useMapRefStore = create<MapRefState>((set) => ({
  mapRef: null,
  setMapRef: (ref) => set({ mapRef: ref }),
}));
