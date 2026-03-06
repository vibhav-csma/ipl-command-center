export function LiveIndicator() {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-medium">
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      Live
    </span>
  );
}
