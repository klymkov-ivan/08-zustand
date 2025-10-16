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

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tag = slug?.[0] || 'All';

  const tagTitle =
    tag === 'All'
      ? 'All Notes'
      : `${tag.charAt(0).toUpperCase()}${tag.slice(1)} Notes`;

  return {
    title: tagTitle,
    description: `Browse ${tagTitle.toLowerCase()} in Note Hub.`,
    openGraph: {
      title: tagTitle,
      description: `Browse ${tagTitle.toLowerCase()} in Note Hub.`,
      url: `/notes/filter/${tag}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${tag} notes`,
        },
      ],
    },
  };
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
