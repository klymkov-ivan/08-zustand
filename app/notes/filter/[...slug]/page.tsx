import { fetchNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';

interface Props {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ topic?: string; page?: string }>;
}

export default async function Notes({ params, searchParams }: Props) {
  const { slug } = await params;
  const { topic = '', page = '1' } = await searchParams;

  const pageNum = Number(page) || 1;
  const tag = slug?.[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', topic, pageNum, tag],
    queryFn: () => fetchNotes(topic, pageNum, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
