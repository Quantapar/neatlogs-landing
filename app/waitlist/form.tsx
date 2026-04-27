"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      reason: String(formData.get("reason") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-zinc-900/10 bg-white p-8 text-center shadow-[0_10px_30px_-12px_rgba(12,20,40,0.08)]">
        <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-zinc-950 text-white">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5"
            aria-hidden="true"
          >
            <path d="M5 12.5L10 17L19 7" />
          </svg>
        </div>
        <h2 className="font-ui mt-4 text-[20px] font-semibold tracking-tight text-zinc-950">
          You&rsquo;re on the list
        </h2>
        <p className="font-ui mt-2 text-[14.5px] text-zinc-600">
          We&rsquo;ll reach out as soon as your early-access slot opens.
        </p>
      </div>
    );
  }

  const inputClass =
    "font-ui block w-full rounded-md border border-zinc-900/12 bg-white px-3.5 py-2.5 text-[14.5px] text-zinc-950 shadow-sm transition-[border-color,box-shadow] duration-150 ease-out placeholder:text-zinc-400 hover:border-zinc-900/20 focus:border-zinc-950 focus:outline-none focus:ring-2 focus:ring-zinc-950/15";
  const labelClass = "font-ui mb-1.5 block text-[13px] font-medium text-zinc-700";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-zinc-900/10 bg-white p-6 shadow-[0_10px_30px_-12px_rgba(12,20,40,0.08)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="waitlist-name" className={labelClass}>
            Name
          </label>
          <input
            id="waitlist-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="waitlist-email" className={labelClass}>
            Email <span className="text-zinc-400">*</span>
          </label>
          <input
            id="waitlist-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="waitlist-company" className={labelClass}>
          Company
        </label>
        <input
          id="waitlist-company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Where you work"
          className={inputClass}
        />
      </div>
      <div className="mt-5">
        <label htmlFor="waitlist-reason" className={labelClass}>
          What brings you here?
        </label>
        <textarea
          id="waitlist-reason"
          name="reason"
          rows={3}
          placeholder="A quick line about what you&rsquo;re building"
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && errorMessage && (
        <p
          role="alert"
          className="font-ui mt-4 text-[13px] font-medium text-red-600"
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="font-ui mt-6 inline-flex h-11 w-full cursor-pointer items-center justify-center rounded bg-zinc-950 px-6 text-sm font-medium text-white shadow-md transition-[transform,background-color,opacity] duration-150 ease-snap hover:bg-zinc-800 active:scale-[0.97] motion-reduce:active:scale-100 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 sm:w-auto"
      >
        {status === "submitting" ? "Submitting…" : "Join the waitlist"}
      </button>
      <p className="font-ui mt-4 text-[12.5px] text-zinc-500">
        We&rsquo;ll only email about Neatlogs early access. No spam.
      </p>
    </form>
  );
}
