import { create } from 'zustand'
import { ClapState } from '@/types/interfaces'

export const useClapStore = create<ClapState>((set, get) => ({
  claps: 0,
  clicked: false,
  setClaps: (value) => set({ claps: value }),
  toggleClap: () => {
    const { claps, clicked } = get()
    if (!clicked) {
      set({ claps: claps + 1, clicked: true })
    } else {
      set({ claps: claps - 1, clicked: false })
    }
  },
}))
