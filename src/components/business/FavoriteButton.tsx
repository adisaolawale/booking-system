"use client";

import { useOptimistic, useTransition } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { toggleFavorite } from "@/lib/actions/favorite";

export function FavoriteButton({
  businessId,
  slug,
  initialFavorited,
  isLoggedIn,
}: {
  businessId: string;
  slug: string;
  initialFavorited: boolean;
  isLoggedIn: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [optimisticFavorited, setOptimisticFavorited] = useOptimistic(initialFavorited);

  if (!isLoggedIn) {
    return (
      <Link
        href="/login"
        aria-label="Log in to save favorites"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <Heart size={16} />
      </Link>
    );
  }

  function handleClick() {
    startTransition(async () => {
      setOptimisticFavorited(!optimisticFavorited);
      await toggleFavorite(businessId, slug);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label={optimisticFavorited ? "Remove from favorites" : "Add to favorites"}
      className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
        optimisticFavorited
          ? "border-primary bg-accent text-primary"
          : "border-border text-muted-foreground hover:border-primary hover:text-primary"
      }`}
    >
      <Heart size={16} className={optimisticFavorited ? "fill-current" : ""} />
    </button>
  );
}