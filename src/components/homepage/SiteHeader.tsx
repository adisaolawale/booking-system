import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeaderSearch } from "@/components/homepage/HeaderSearch";
import { ModeToggle } from "../provider/ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4">
        <Link href="/" className="shrink-0 font-heading text-lg font-semibold text-foreground">
          BookEase
        </Link>

        <nav className="hidden shrink-0 items-center gap-6 md:flex">
          <Link
            href="#popular-services"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Services
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            How it Works
          </Link>
        </nav>

        <HeaderSearch />

        <div className="flex shrink-0 items-center gap-2">
          <Button asChild variant="ghost" className="hidden text-sm sm:inline-flex">
            <Link href="/services">Book a Service</Link>
          </Button>
          <Button
            asChild
            className="rounded-full bg-primary px-5 text-sm text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/register">Start for Free</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}


// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { HeaderSearch } from "@/components/homepage/HeaderSearch";
// import { ModeToggle } from "../provider/ThemeToggle";

// export function SiteHeader() {
//   return (
//     <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
//       <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4">
//         <Link href="/" className="shrink-0 font-heading text-lg font-semibold text-foreground">
//           BookEase
//         </Link>

//         <nav className="hidden shrink-0 items-center gap-6 md:flex">
//           <Link
//             href="/services"
//             className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
//           >
//             Services
//           </Link>
//           <Link
//             href="#how-it-works"
//             className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
//           >
//             How it Works
//           </Link>
//         </nav>

//         <HeaderSearch />

//         <div className="flex shrink-0 items-center gap-2">
//           <Button asChild variant="ghost" className="hidden text-sm sm:inline-flex">
//             <Link href="/book-a-service">Book a Service</Link>
//           </Button>
//           <Button
//             asChild
//             className="rounded-full bg-primary px-5 text-sm text-primary-foreground hover:bg-primary/90"
//           >
//             <Link href="/register">Start for Free</Link>
//           </Button>
//           <ModeToggle />
//         </div>
//       </div>
//     </header>
//   );
// }


// import Link from "next/link";
// import { Search } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ModeToggle } from "../provider/ThemeToggle";
// export function SiteHeader() {
//   return (
//     <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
//       <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4">
//         <Link href="/" className="shrink-0 font-heading text-lg font-semibold text-foreground">
//           BookEase
//         </Link>

//         <nav className="hidden shrink-0 items-center gap-6 md:flex">
//           <Link
//             href="/services"
//             className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
//           >
//             Services
//           </Link>
//           <Link
//             href="#how-it-works"
//             className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
//           >
//             How it Works
//           </Link>
//         </nav>

//         {/* Search sits between the nav and the CTAs — a customer looking for
//             a studio or service is the primary marketing-site search intent,
//             so it earns a real spot in the header, not a buried icon. */}
//         <div className="relative hidden max-w-xs flex-1 md:block">
//           <Search
//             size={15}
//             className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
//           />
//           <Input
//             type="search"
//             placeholder="Search services or studios..."
//             className="rounded-full border-border bg-muted pl-9 text-sm"
//           />
//         </div>

//         <div className="flex shrink-0 items-center gap-2">
//           <Button asChild variant="ghost" className="hidden text-sm sm:inline-flex">
//             <Link href="/book-a-service">Book a Service</Link>
//           </Button>
//           <Button
//             asChild
//             className="rounded-full bg-primary px-5 text-sm text-primary-foreground hover:bg-primary/90"
//           >
//             <Link href="/register">Start for Free</Link>
//           </Button>
//           <ModeToggle/>
//         </div>
//       </div>
//     </header>
//   );
// }
