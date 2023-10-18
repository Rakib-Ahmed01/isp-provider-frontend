'use client'; // Error components must be Client Components

import CustomError from '@/components/ui/custom-error';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <CustomError />
    </div>
  );
}
