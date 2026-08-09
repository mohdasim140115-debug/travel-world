"use client";

import { useActionState } from "react";
import { Lock, Plane } from "lucide-react";
import { loginAction } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B3B63] px-4">
      <div className="w-full max-w-[380px] rounded-[16px] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0F4C81]">
            <Plane className="h-6 w-6 text-white" />
          </div>
          <h1 className="mt-4 text-[22px] font-bold text-[#0F172A]">Honor Tour & Travels Admin</h1>
          <p className="mt-1 text-[13px] text-[#475569]">Sign in to manage site content</p>
        </div>

        <form action={formAction} className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor="password" className="text-[12px] font-semibold text-[#475569]">
              Password
            </label>
            <div className="mt-1 flex items-center gap-2 rounded-[8px] border border-[#D1D5DB] px-3 py-2.5 focus-within:border-[#17BEBB]">
              <Lock className="h-4 w-4 shrink-0 text-[#94A3B8]" />
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                placeholder="Enter admin password"
                className="w-full text-[14px] text-[#0F172A] outline-none"
              />
            </div>
          </div>

          {state?.error && (
            <p className="rounded-[8px] bg-red-50 px-3 py-2 text-[12px] font-medium text-red-600">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-1 flex h-[44px] w-full items-center justify-center rounded-[8px] bg-[#FF7A1A] text-[14px] font-bold text-white transition-colors hover:bg-[#E56A0F] disabled:opacity-60"
          >
            {isPending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
