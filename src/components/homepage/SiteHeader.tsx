import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HeaderSearch } from "@/components/homepage/HeaderSearch";
import { ProfileMenu } from "@/components/account/ProfileMenu";
import { auth } from "@/lib/auth";

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export async function SiteHeader() {
  const session = await auth();

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
          {session ? (
            <ProfileMenu
              name={session.user.name ?? "Account"}
              email={session.user.email ?? ""}
              role={session.user.role}
              side="bottom"
              align="end"
            >
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3 transition-colors hover:bg-muted"
              >
                <Avatar className="h-7 w-7 bg-foreground">
                  <AvatarFallback className="bg-foreground text-[10px] font-medium text-background">
                    {initials(session.user.name ?? "Account")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground">
                  {session.user.name?.split(" ")[0] ?? "Account"}
                </span>
              </button>
            </ProfileMenu>
          ) : (
            <>
              <Button asChild variant="ghost" className="hidden text-sm sm:inline-flex">
                <Link href="/services">Book a Service</Link>
              </Button>
              <Button
                asChild
                className="rounded-full bg-primary px-5 text-sm text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/register">Start for Free</Link>
              </Button>
            </>
          )}
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
//             href="#popular-services"
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
//             <Link href="/services">Book a Service</Link>
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
