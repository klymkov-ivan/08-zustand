import { NewNote } from '@/types/note';
import { create } from 'zustand';

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

export const useDraftStore = create<DraftState>()((set) => ({
  draft: initialDraft,

  setDraft: (note) =>
    set((state) => ({
      draft: { ...state.draft, ...note },
    })),

  clearDraft: () => set({ draft: initialDraft }),
}));
