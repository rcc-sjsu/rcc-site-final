'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] px-4">
      <h2 className="text-xl font-semibold text-[var(--color-brand-dark-violet)] mb-2">
        Something went wrong
      </h2>
      <p className="text-[var(--color-brand-dark-grey)] mb-4 text-center">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <button
        type="button"
        onClick={reset}
        className="px-4 py-2 rounded-lg bg-[var(--color-brand-dark-periwinkle)] text-white font-medium hover:bg-[var(--color-brand-dark-violet)]"
      >
        Try again
      </button>
    </div>
  );
}
