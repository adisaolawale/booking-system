import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function BusinessHeaderCompact({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  return (
    <Link href={`/b/${slug}`} className="flex items-center gap-3">
      <Avatar className="h-9 w-9 bg-foreground">
        <AvatarFallback className="bg-foreground font-heading text-xs text-background">
          {initials(name)}
        </AvatarFallback>
      </Avatar>
      <span className="font-medium text-foreground">{name}</span>
    </Link>
  );
}

// import Link from "next/link";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// function initials(name: string) {
//   return name
//     .split(" ")
//     .map((w) => w[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();
// }

// export function BusinessHeaderCompact({
//   slug,
//   name,
// }: {
//   slug: string;
//   name: string;
// }) {
//   return (
//     <Link href={`/b/${slug}`} className="flex items-center gap-3">
//       <Avatar className="h-9 w-9 bg-[#14171F]">
//         <AvatarFallback className="bg-[#14171F] font-serif text-xs text-white">
//           {initials(name)}
//         </AvatarFallback>
//       </Avatar>
//       <span className="font-medium text-[#14171F]">{name}</span>
//     </Link>
//   );
// }