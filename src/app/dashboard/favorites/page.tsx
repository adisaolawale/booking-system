import Link from "next/link";
import { Heart } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FavoriteButton } from "@/components/business/FavoriteButton";

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export default async function FavoritesPage() {
  const session = await auth();
  const userId = session!.user.id;

  const favorites = await prisma.favorite.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { business: true },
  });

  return (
    <div>
      <h1 className="mb-1 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
        Favorites
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Businesses you&rsquo;ve saved for later.
      </p>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border p-10 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent">
            <Heart size={20} className="text-primary" />
          </div>
          <h3 className="mb-1 font-heading text-base font-semibold text-foreground">
            No favorites yet
          </h3>
          <p className="mb-5 max-w-xs text-sm text-muted-foreground">
            Tap the heart on a business page to save it here.
          </p>
          <Link
            href="/"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Browse services
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <Link href={`/b/${fav.business.slug}`} className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground font-heading text-xs font-semibold text-background">
                    {initials(fav.business.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground hover:underline">
                      {fav.business.name}
                    </p>
                    {fav.business.description && (
                      <p className="truncate text-xs text-muted-foreground">
                        {fav.business.description}
                      </p>
                    )}
                  </div>
                </Link>

                <FavoriteButton
                  businessId={fav.business.id}
                  slug={fav.business.slug!}
                  initialFavorited={true}
                  isLoggedIn={true}
                />
              </div>

              <Link
                href={`/b/${fav.business.slug}`}
                className="rounded-full border border-border py-2 text-center text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                View business
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}