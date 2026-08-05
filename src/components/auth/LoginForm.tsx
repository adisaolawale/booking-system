"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { loginAction, type LoginState } from "@/lib/actions/login";
import { signInWithGoogle } from "@/lib/actions/oauth";

export function LoginForm() {
  const initialState: LoginState = {};
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="mb-6 text-center">
        <h1 className="mb-1.5 font-heading text-2xl font-semibold text-foreground">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">Log in to manage your bookings.</p>
      </div>

      <form action={signInWithGoogle}>
        <button
          type="submit"
          className="mb-6 flex w-full items-center justify-center gap-2.5 rounded-xl border border-border py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <GoogleIcon size={18} />
          Continue with Google
        </button>
      </form>

      <div className="mb-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or continue with email</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="jane@example.com" required />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input id="password" name="password" type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" required />
        </div>

        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" name="remember" className="h-4 w-4 rounded border-border accent-primary" />
          Remember me
        </label>

        {state.error && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {state.error}
          </p>
        )}

        <Button
          type="submit"
          className="mt-2 w-full rounded-xl bg-primary py-6 text-sm text-primary-foreground hover:bg-primary/90"
        >
          Log in
        </Button>
      </form>
    </div>
  );
}