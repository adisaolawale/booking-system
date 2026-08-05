import Link from "next/link";
import { ModeToggle } from "@/components/provider/ThemeToggle"

export function AuthHeader({ mode }: { mode: "login" | "register" }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-heading text-lg font-semibold text-foreground">
          BookEase
        </Link>

        <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
          {mode === "register" ? (
            <>
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Log in
              </Link>
            </>
          ) : (
            <>
              New to BookEase?{" "}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Create an account
              </Link>
            </>
          )}
        </p>
        <ModeToggle />
        </div>
      </div>
    </header>
  );
}