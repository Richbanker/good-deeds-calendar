export interface GoodDeed {
  date: string;
  icon: string;
  text: string;
}

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  deeds: Record<string, GoodDeed>;
  addDeed: (deed: GoodDeed) => void;
  removeDeed: (date: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      deeds: {},
      addDeed: (deed) =>
        set((state) => ({
          deeds: { ...state.deeds, [deed.date]: deed },
        })),
      removeDeed: (date) =>
        set((state) => {
          const copy = { ...state.deeds };
          delete copy[date];
          return { deeds: copy };
        }),
    }),
    { name: "good-deeds-storage" }
  )
);
