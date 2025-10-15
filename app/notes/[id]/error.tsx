'use client';

interface Props {
  error: Error;
}

export default function Error({ error }: Props) {
  return <p>Error: {error.message}</p>;
}
