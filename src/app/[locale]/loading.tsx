export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <span
        className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--border-light)] border-t-[var(--accent-blue)]"
        aria-label="Loading"
        role="status"
      />
    </div>
  );
}
