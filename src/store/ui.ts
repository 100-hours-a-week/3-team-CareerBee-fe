import { create } from 'zustand';

interface UiState {
  backPressedFromHeader: boolean;
  setBackPressedFromHeader: (pressed: boolean) => void;
  mapPressedFromNavbar: boolean;
  setMapPressedFromNavbar: (pressed: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  backPressedFromHeader: false,
  setBackPressedFromHeader: (pressed) => set({ backPressedFromHeader: pressed }),
  mapPressedFromNavbar: false,
  setMapPressedFromNavbar: (pressed) => set({ mapPressedFromNavbar: pressed }),

}));