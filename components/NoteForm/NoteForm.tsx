'use client';

import css from './NoteForm.module.css';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import type { NewNote } from '@/types/note';
import { useDraftStore } from '@/lib/store/noteStore';

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useDraftStore();

  const createNoteMutate = useMutation({
    mutationFn: (data: NewNote) => createNote(data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  async function handleSubmit(formData: FormData) {
    const payload: NewNote = {
      title: (formData.get('title') as string)?.trim() || '',
      content: (formData.get('content') as string)?.trim() || '',
      tag: (formData.get('tag')?.toString() as NewNote['tag']) ?? 'Todo',
    };

    await createNoteMutate.mutateAsync(payload);
    clearDraft();
    router.push('/notes/filter/All');
  }

  const handleCancel = () => {
    router.push('/notes/filter/All');
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          value={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={(e) =>
            setDraft({ tag: e.currentTarget.value as NewNote['tag'] })
          }
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={handleCancel}
          className={css.cancelButton}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={createNoteMutate.isPending}
        >
          {createNoteMutate.isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}
