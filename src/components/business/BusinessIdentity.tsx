import { Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NextAvailableBadge } from "@/components/business/NextAvailableBadge";
import { FavoriteButton } from "@/components/business/FavoriteButton";

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export function BusinessIdentity({
  businessId,
  slug,
  name,
  description,
  hours,
  nextAvailable,
  isFavorited,
  isLoggedIn,
}: {
  businessId: string;
  slug: string;
  name: string;
  description: string | null;
  hours: string;
  nextAvailable: string | null;
  isFavorited: boolean;
  isLoggedIn: boolean;
}) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="absolute right-0 top-0">
        <FavoriteButton
          businessId={businessId}
          slug={slug}
          initialFavorited={isFavorited}
          isLoggedIn={isLoggedIn}
        />
      </div>

      <Avatar className="mb-5 h-16 w-16 bg-foreground">
        <AvatarFallback className="bg-foreground font-heading text-lg text-background">
          {initials(name)}
        </AvatarFallback>
      </Avatar>

      <h1 className="mb-1.5 font-heading text-3xl font-semibold text-foreground">
        {name}
      </h1>
      {description && (
        <p className="mb-5 text-sm italic text-muted-foreground">{description}</p>
      )}

      <div className="mb-5 flex items-center justify-center gap-2 text-sm text-foreground">
        <Clock size={14} className="text-muted-foreground" />
        <span className="font-mono">{hours}</span>
      </div>

      <NextAvailableBadge label={nextAvailable} />
    </div>
  );
}


// import { Clock } from "lucide-react";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { NextAvailableBadge } from "@/components/business/NextAvailableBadge";

// function initials(name: string) {
//   return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
// }

// export function BusinessIdentity({
//   name,
//   description,
//   hours,
//   nextAvailable,
// }: {
//   name: string;
//   description: string | null;
//   hours: string;
//   nextAvailable: string | null;
// }) {
//   return (
//     <div className="flex flex-col items-center text-center">
//       <Avatar className="mb-5 h-16 w-16 bg-foreground">
//         <AvatarFallback className="bg-foreground font-heading text-lg text-background">
//           {initials(name)}
//         </AvatarFallback>
//       </Avatar>

//       <h1 className="mb-1.5 font-heading text-3xl font-semibold text-foreground">
//         {name}
//       </h1>
//       {description && (
//         <p className="mb-5 text-sm italic text-muted-foreground">{description}</p>
//       )}

//       <div className="mb-5 flex items-center justify-center gap-2 text-sm text-foreground">
//         <Clock size={14} className="text-muted-foreground" />
//         <span className="font-mono">{hours}</span>
//       </div>

//       <NextAvailableBadge label={nextAvailable} />
//     </div>
//   );
// }



// import Link from "next/link";
// import { Clock, ArrowRight } from "lucide-react";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { NextAvailableBadge } from "@/components/business/NextAvailableBadge";

// function initials(name: string) {
//   return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
// }

// export function BusinessIdentity({
//   slug,
//   name,
//   description,
//   hours,
//   nextAvailable,
// }: {
//   slug: string;
//   name: string;
//   description: string | null;
//   hours: string;
//   nextAvailable: string | null;
// }) {
//   return (
//     <div className="flex flex-col items-center text-center">
//       <Avatar className="mb-5 h-16 w-16 bg-foreground">
//         <AvatarFallback className="bg-foreground font-heading text-lg text-background">
//           {initials(name)}
//         </AvatarFallback>
//       </Avatar>

//       <h1 className="mb-1.5 font-space text-3xl font-semibold text-foreground">
//         {name}
//       </h1>
//       {description && (
//         <p className="mb-5 text-sm italic text-muted-foreground">{description}</p>
//       )}

//       <div className="mb-5 flex items-center justify-center gap-2 text-sm text-foreground">
//         <Clock size={14} className="text-muted-foreground" />
//         <span className="font-mono">{hours}</span>
//       </div>

//       <NextAvailableBadge label={nextAvailable} />

//       {/* Only needed when the services panel isn't already visible alongside — hidden on lg+ */}
//       <Button
//         asChild
//         className="mt-7 w-full gap-2 rounded-xl bg-primary py-6 text-sm text-primary-foreground hover:bg-primary/90 lg:hidden"
//       >
//         <Link href={`/b/${slug}/services`}>
//           View services
//           <ArrowRight size={15} />
//         </Link>
//       </Button>
//     </div>
//   );
// }