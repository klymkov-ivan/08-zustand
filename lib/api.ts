import axios from 'axios';
import type { NewNote, Note } from '../types/note';

interface ResponseAPI {
  notes: Note[];
  totalPages: number;
}

interface OptionsAPI {
  params: {
    search?: string;
    page: number;
    perPage: number;
    tag?: string;
  };
}

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] =
  `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`;

export async function fetchNotes(
  searchWord: string,
  page: number,
  tag?: string,
) {
  const options: OptionsAPI = {
    params: {
      search: searchWord,
      page: page,
      perPage: 12,
      tag: tag === 'All' ? undefined : tag,
    },
  };

  const res = await axios.get<ResponseAPI>('/notes', options);
  return res.data;
}

export async function createNote(data: NewNote) {
  const res = await axios.post<Note>('/notes', data);
  return res.data;
}

export async function deleteNote(id: string) {
  const res = await axios.delete<Note>(`/notes/${id}`);
  return res.data;
}

export async function fetchNoteById(id: string) {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
}
