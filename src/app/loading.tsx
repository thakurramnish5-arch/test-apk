/** Route-level loading state. */
export default function Loading() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center bg-charcoal-50"
      role="status"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-3">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-forest-200 border-t-forest-700" />
        <span className="text-sm font-medium text-charcoal-500">
          Loading, please wait…
        </span>
      </div>
    </div>
  );
}
