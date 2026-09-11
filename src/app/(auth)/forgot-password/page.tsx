"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  KeyRound,
  ShieldCheck,
  Check,
  X,
  Loader2,
} from "lucide-react";

type RecoveryStep = "EMAIL" | "PIN" | "NEW_PASSWORD" | "SUCCESS";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<RecoveryStep>("EMAIL");

  // Step 1: Email state
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Step 2: PIN state (6 digits)
  const [pin, setPin] = useState<string[]>(Array(6).fill(""));
  const pinInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [pinError, setPinError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Step 3: New Password state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Common UI State
  const [isLoading, setIsLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  // Mask email for security display (e.g., o••••e@example.com)
  const maskEmail = (val: string) => {
    if (!val.includes("@")) return val;
    const [name, domain] = val.split("@");
    if (name.length <= 2) return `${name[0]}••••@${domain}`;
    return `${name[0]}••••${name[name.length - 1]}@${domain}`;
  };

  // Cooldown timer effect
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Focus first PIN box when moving to PIN step
  useEffect(() => {
    if (step === "PIN") {
      setTimeout(() => pinInputRefs.current[0]?.focus(), 100);
    }
  }, [step]);

  // --- STEP 1: HANDLERS ---
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    // Simulate API request to generate/send recovery PIN
    setTimeout(() => {
      setIsLoading(false);
      setInfoMessage("If an account exists for this email, we'll send a verification PIN.");
      setStep("PIN");
      setResendCooldown(45);
    }, 800);
  };

  // --- STEP 2: PIN INPUT HANDLERS ---
  const handlePinChange = (index: number, value: string) => {
    if (pinError) setPinError("");
    if (infoMessage) setInfoMessage(null);

    // Only allow single digit numeric input
    const digit = value.replace(/[^0-9]/g, "");
    if (!digit && value !== "") return;

    const newPin = [...pin];
    newPin[index] = digit.slice(-1);
    setPin(newPin);

    // Auto-advance to next box
    if (digit && index < 5) {
      pinInputRefs.current[index + 1]?.focus();
    }
  };

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      pinInputRefs.current[index - 1]?.focus();
    }
  };

  const handlePinPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);
    if (!pastedData) return;

    const newPin = Array(6).fill("");
    for (let i = 0; i < pastedData.length; i++) {
      newPin[i] = pastedData[i];
    }
    setPin(newPin);

    const focusIndex = Math.min(pastedData.length, 5);
    pinInputRefs.current[focusIndex]?.focus();
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    const fullPin = pin.join("");

    if (fullPin.length < 6) {
      setPinError("Please enter the complete 6-digit PIN.");
      return;
    }

    if (attempts >= 4) {
      setPinError("Too many failed attempts. Please request a new PIN.");
      return;
    }

    setIsLoading(true);
    // Simulate API PIN verification
    setTimeout(() => {
      setIsLoading(false);
      // Mock validation logic: '123456' or any valid 6 digits for testing
      if (fullPin === "000000") {
        setAttempts((prev) => prev + 1);
        setPinError("Invalid PIN entered. Please check and try again.");
      } else {
        setStep("NEW_PASSWORD");
      }
    }, 800);
  };

  const handleResendPin = () => {
    if (resendCooldown > 0 || isLoading) return;
    setIsLoading(true);
    setPinError("");
    // Simulate API resend
    setTimeout(() => {
      setIsLoading(false);
      setPin(Array(6).fill(""));
      setAttempts(0);
      setResendCooldown(45);
      setInfoMessage("A new verification PIN has been sent.");
    }, 800);
  };

  // --- STEP 3: PASSWORD VALIDATION & SUBMIT ---
  const passwordRules = {
    minLength: newPassword.length >= 8,
    hasUppercase: /[A-Z]/.test(newPassword),
    hasLowercase: /[a-z]/.test(newPassword),
    hasNumber: /[0-9]/.test(newPassword),
  };

  const isPasswordValid = Object.values(passwordRules).every(Boolean);

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (!isPasswordValid) {
      setPasswordError("Please meet all password requirements before continuing.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    // Simulate API password update
    setTimeout(() => {
      setIsLoading(false);
      setStep("SUCCESS");
    }, 1000);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">
        
        {/* Main Card Container */}
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          
          {/* Ambient Glow Effects */}
          <div className="pointer-events-none absolute -left-10 -top-10 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-6 h-44 w-44 rounded-full bg-secondary/40 blur-3xl" />

          <div className="relative z-10">

            {/* Visual Step Progress Indicator */}
            {step !== "SUCCESS" && (
              <div className="mb-6 flex items-center justify-between border-b border-border/60 pb-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                      step === "EMAIL"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    1
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">Email</span>
                </div>
                <div className="h-0.5 flex-1 bg-border/60 mx-2" />
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                      step === "PIN"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    2
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">Verify PIN</span>
                </div>
                <div className="h-0.5 flex-1 bg-border/60 mx-2" />
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                      step === "NEW_PASSWORD"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    3
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">Reset</span>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* STEP 1: ENTER EMAIL */}
            {/* ----------------------------------------------------------------- */}
            {step === "EMAIL" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-2">
                    <KeyRound size={20} />
                  </div>
                  <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                    Forgot your password?
                  </h1>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Enter the email address associated with your BookEase account and we&apos;ll send you a verification PIN.
                  </p>
                </div>

                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  {emailError && (
                    <div className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{emailError}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label htmlFor="recovery-email" className="text-xs font-medium text-foreground">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                      />
                      <input
                        id="recovery-email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError("");
                        }}
                        placeholder="e.g. alex@example.com"
                        className="w-full rounded-xl border border-border bg-background pl-10 pr-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all shadow-sm disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending PIN...</span>
                      </>
                    ) : (
                      <span>Continue &amp; Send PIN</span>
                    )}
                  </button>
                </form>

                <div className="text-center pt-2">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft size={14} />
                    <span>Back to Sign In</span>
                  </Link>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* STEP 2: VERIFY PIN */}
            {/* ----------------------------------------------------------------- */}
            {step === "PIN" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-2">
                    <ShieldCheck size={20} />
                  </div>
                  <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                    Enter verification PIN
                  </h1>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We sent a 6-digit PIN to{" "}
                    <span className="font-medium text-foreground">{maskEmail(email)}</span>.
                  </p>
                </div>

                {infoMessage && (
                  <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 p-3 text-xs text-primary">
                    <CheckCircle2 size={16} className="shrink-0" />
                    <span>{infoMessage}</span>
                  </div>
                )}

                {pinError && (
                  <div className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{pinError}</span>
                  </div>
                )}

                <form onSubmit={handleVerifyPin} className="space-y-6">
                  {/* 6-Digit Separate PIN Input Grid */}
                  <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                    {pin.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => {
                          pinInputRefs.current[idx] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handlePinChange(idx, e.target.value)}
                        onKeyDown={(e) => handlePinKeyDown(idx, e)}
                        onPaste={handlePinPaste}
                        className="h-12 w-11 sm:w-12 text-center text-lg font-semibold rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        aria-label={`Digit ${idx + 1} of 6`}
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || pin.join("").length < 6}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all shadow-sm disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <span>Verify PIN</span>
                    )}
                  </button>
                </form>

                {/* Resend & Email Change Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs">
                  <button
                    type="button"
                    onClick={handleResendPin}
                    disabled={resendCooldown > 0 || isLoading}
                    className="inline-flex items-center gap-1.5 font-medium text-primary disabled:text-muted-foreground hover:underline transition-colors"
                  >
                    <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
                    {resendCooldown > 0 ? (
                      <span>Resend PIN in {resendCooldown}s</span>
                    ) : (
                      <span>Resend PIN</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setStep("EMAIL");
                      setPin(Array(6).fill(""));
                      setPinError("");
                      setInfoMessage(null);
                    }}
                    className="font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Change email
                  </button>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* STEP 3: CREATE NEW PASSWORD */}
            {/* ----------------------------------------------------------------- */}
            {step === "NEW_PASSWORD" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-2">
                    <Lock size={20} />
                  </div>
                  <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                    Create a new password
                  </h1>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Choose a strong, secure password for your BookEase account.
                  </p>
                </div>

                {passwordError && (
                  <div className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{passwordError}</span>
                  </div>
                )}

                <form onSubmit={handleResetPassword} className="space-y-4">
                  {/* New Password Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="new-password" className="text-xs font-medium text-foreground">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                      />
                      <input
                        id="new-password"
                        type={showNewPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-border bg-background pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showNewPassword ? "Hide password" : "Show password"}
                      >
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Real-Time Requirement Checklist */}
                  <div className="rounded-xl border border-border/80 bg-muted/40 p-3 space-y-2 text-xs">
                    <p className="font-medium text-foreground">Password must contain:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-1.5">
                        {passwordRules.minLength ? (
                          <Check size={14} className="text-emerald-500" />
                        ) : (
                          <X size={14} className="text-muted-foreground" />
                        )}
                        <span className={passwordRules.minLength ? "text-foreground font-medium" : "text-muted-foreground"}>
                          8+ characters
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {passwordRules.hasUppercase ? (
                          <Check size={14} className="text-emerald-500" />
                        ) : (
                          <X size={14} className="text-muted-foreground" />
                        )}
                        <span className={passwordRules.hasUppercase ? "text-foreground font-medium" : "text-muted-foreground"}>
                          Uppercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {passwordRules.hasLowercase ? (
                          <Check size={14} className="text-emerald-500" />
                        ) : (
                          <X size={14} className="text-muted-foreground" />
                        )}
                        <span className={passwordRules.hasLowercase ? "text-foreground font-medium" : "text-muted-foreground"}>
                          Lowercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {passwordRules.hasNumber ? (
                          <Check size={14} className="text-emerald-500" />
                        ) : (
                          <X size={14} className="text-muted-foreground" />
                        )}
                        <span className={passwordRules.hasNumber ? "text-foreground font-medium" : "text-muted-foreground"}>
                          One number
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Confirm Password Input */}
                  <div className="space-y-1.5 pt-1">
                    <label htmlFor="confirm-password" className="text-xs font-medium text-foreground">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                      />
                      <input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`w-full rounded-xl border bg-background pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
                          confirmPassword && confirmPassword !== newPassword
                            ? "border-destructive focus:ring-destructive/20"
                            : "border-border focus:ring-primary/20 focus:border-primary"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {confirmPassword && confirmPassword !== newPassword && (
                      <p className="text-xs text-destructive">Passwords do not match.</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !isPasswordValid || newPassword !== confirmPassword}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all shadow-sm disabled:opacity-50 pt-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Resetting password...</span>
                      </>
                    ) : (
                      <span>Reset Password</span>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* ----------------------------------------------------------------- */}
            {/* STEP 4: SUCCESS STATE */}
            {/* ----------------------------------------------------------------- */}
            {step === "SUCCESS" && (
              <div className="py-4 text-center space-y-5">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                  <CheckCircle2 size={32} />
                </div>

                <div className="space-y-2">
                  <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                    Password reset successfully
                  </h1>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                    Your BookEase password has been updated. You can now sign in using your new credentials.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href="/login"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all shadow-sm"
                  >
                    <span>Back to Sign In</span>
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}