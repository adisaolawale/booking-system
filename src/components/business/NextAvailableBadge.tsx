export function NextAvailableBadge({ label }: { label: string | null }) {
  if (!label) return null;

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
      </span>
      <span className="font-mono text-xs text-accent-foreground">
        Next available &middot; {label}
      </span>
    </div>
  );
}

// export function NextAvailableBadge({ label }: { label: string | null }) {
//   if (!label) return null;

//   return (
//     <div className="inline-flex items-center gap-2 rounded-full bg-[#E5F1EE] px-3 py-1.5">
//       <span className="relative flex h-2 w-2">
//         <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0F6E63] opacity-75" />
//         <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0F6E63]" />
//       </span>
//       <span className="font-mono text-xs text-[#0C5A50]">
//         Next available &middot; {label}
//       </span>
//     </div>
//   );
// }