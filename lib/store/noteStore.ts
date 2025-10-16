import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import type { NewNote } from '@/types/note';

interface DraftState {
  draft: NewNote;
  setDraft: (note: Partial<NewNote>) => void;
  clearDraft: () => void;
}

const initialDraft: NewNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

const fakeStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useDraftStore = create<DraftState>()(
  persist(
    (set, get) => ({
      draft: initialDraft,

      setDraft: (note) =>
        set(() => ({
          draft: { ...get().draft, ...note },
        })),

      clearDraft: () => set({ draft: { ...initialDraft } }),
    }),
    {
      name: 'note-draft',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? window.localStorage : fakeStorage,
      ),
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
