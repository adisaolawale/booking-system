"use client";

import { useActionState, useRef } from "react";
import { useFormStatus } from "react-dom";
import { verifyEmail, resendCode, type VerifyState } from "@/lib/actions/verify";

const LENGTH = 6;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
    >
      {pending ? "Verifying\u2026" : "Verify email"}
    </button>
  );
}

export function VerifyForm({ email }: { email: string }) {
  const initialState: VerifyState = {};
  const [state, formAction] = useActionState(verifyEmail, initialState);
  const boxRefs = useRef<(HTMLInputElement | null)[]>([]);
  const hiddenRef = useRef<HTMLInputElement>(null);

  function syncHidden() {
    if (hiddenRef.current) {
      hiddenRef.current.value = boxRefs.current.map((el) => el?.value ?? "").join("");
    }
  }

  function handleChange(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const digit = e.target.value.replace(/\D/g, "").slice(-1);
    e.target.value = digit;
    syncHidden();
    if (digit && index < LENGTH - 1) boxRefs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    if (e.key === "Backspace" && !target.value && index > 0) {
      boxRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
    if (!digits) return;
    e.preventDefault();
    digits.split("").forEach((d, i) => {
      const box = boxRefs.current[i];
      if (box) box.value = d;
    });
    syncHidden();
    boxRefs.current[Math.min(digits.length, LENGTH) - 1]?.focus();
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="code" ref={hiddenRef} />

      <div className="flex justify-center gap-2" onPaste={handlePaste}>
        {Array.from({ length: LENGTH }).map((_, i) => (
          <input
            key={i}
            ref={(el) => {
              boxRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="h-12 w-11 rounded-xl border border-border bg-background text-center font-mono text-lg text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        ))}
      </div>

      {state.error && (
        <p className="text-center text-sm text-destructive">{state.error}</p>
      )}

      <SubmitButton />

      <p className="text-center text-xs text-muted-foreground">
        Didn&rsquo;t get a code?{" "}
        <button
          type="submit"
          formAction={resendCode.bind(null, email)}
          className="font-medium text-primary hover:underline"
        >
          Resend
        </button>
      </p>
    </form>
  );
}