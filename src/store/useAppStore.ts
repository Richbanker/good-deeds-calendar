import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type GoodDeed = {
  date: string;
  text: string;
  icon: string;
};

interface AppState {
  deeds: Record<string, GoodDeed>;
  addDeed: (deed: GoodDeed) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      deeds: {},

      addDeed: (deed) => {
        set((state) => ({
          deeds: {
            ...state.deeds,
            [deed.date]: deed,
          },
        }));
      },

      reset: () => {
        set({ deeds: {} });
      },
    }),
    {
      name: 'good_deeds_calendar', // ключ в localStorage
      partialize: (state) => ({ deeds: state.deeds }), // сохраняем только deeds
    }
  )
);
