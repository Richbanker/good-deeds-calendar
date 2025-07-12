import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface GoodDeed {
  date: string;
  icon: string;
  text: string;
}

interface AppState {
  deeds: Record<string, GoodDeed>;
  theme: 'light' | 'dark';
  modalOpen: boolean;
  selectedDay: number | null;
  addDeed: (deed: GoodDeed) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setModalOpen: (open: boolean) => void;
  setSelectedDay: (day: number | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      deeds: {},
      theme: 'light',
      modalOpen: false,
      selectedDay: null,
      addDeed: (deed) => set((state) => ({
        deeds: {
          ...state.deeds,
          [deed.date]: deed,
        },
      })),
      setTheme: (theme) => set({ theme }),
      setModalOpen: (modalOpen) => set({ modalOpen }),
      setSelectedDay: (selectedDay) => set({ selectedDay }),
    }),
    {
      name: 'good-deeds-storage',
    }
  )
);
