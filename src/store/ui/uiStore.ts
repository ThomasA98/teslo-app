import { create } from "zustand";

export interface UseUiStoreState {
    isSideMenuOpen: boolean

    openSideMenu: () => void
    closeSideMenu: () => void
}

export const useUiStore = create<UseUiStoreState>()((set) => ({
    isSideMenuOpen: false,

    closeSideMenu: () => set({ isSideMenuOpen: false }),
    openSideMenu: () => set({ isSideMenuOpen: true }),
}))