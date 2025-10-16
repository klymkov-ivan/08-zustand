import { Metadata } from 'next';
import css from './page.module.css';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'Some error, sorry this page not found',
  openGraph: {
    title: 'Page not found',
    description: 'Some error, sorry this page not found',
    url: `/not-found`,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: `Notes`,
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 — Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
