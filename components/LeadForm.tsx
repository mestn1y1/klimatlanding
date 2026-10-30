"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

export default function LeadForm({ id }: { id?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("bad response");
      form.reset();
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div id={id} className="rounded-2xl bg-white p-8 text-center shadow-xl">
        <p className="font-display text-2xl font-bold text-ink">Дякуємо, заявку отримано</p>
        <p className="mt-2 text-ink/70">Передзвонимо найближчим часом.</p>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={onSubmit} className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
      <p className="font-display text-xl font-bold text-ink">Розрахунок вартості безкоштовно</p>
      <p className="mt-1 text-sm text-ink/60">Залиште номер, і ми передзвонимо.</p>

      {/* Приманка для ботів: людина це поле не бачить і не заповнює */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <label className="mt-5 block text-sm font-medium text-ink">
        Ім&apos;я
        <input
          name="name"
          required
          minLength={2}
          maxLength={60}
          autoComplete="name"
          className="mt-1 w-full rounded-xl border border-ink/15 px-4 py-3 text-base outline-none focus:border-sky focus:ring-2 focus:ring-sky/30"
        />
      </label>

      <label className="mt-4 block text-sm font-medium text-ink">
        Телефон
        <input
          name="phone"
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          placeholder="+380"
          pattern="^[+0-9()\s-]{10,18}$"
          className="mt-1 w-full rounded-xl border border-ink/15 px-4 py-3 text-base outline-none focus:border-sky focus:ring-2 focus:ring-sky/30"
        />
      </label>

      <label className="mt-4 block text-sm font-medium text-ink">
        Що потрібно? <span className="text-ink/40">(необов&apos;язково)</span>
        <textarea
          name="comment"
          rows={3}
          maxLength={500}
          placeholder="Наприклад: 2 кондиціонери, 3-й поверх, є своє обладнання"
          className="mt-1 w-full rounded-xl border border-ink/15 px-4 py-3 text-base outline-none focus:border-sky focus:ring-2 focus:ring-sky/30"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-xl bg-ember px-6 py-4 font-display text-lg font-bold text-white transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "sending" ? "Надсилаємо…" : "Замовити дзвінок"}
      </button>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-600">Не вдалося надіслати. Спробуйте ще раз або зателефонуйте нам.</p>
      )}

      <p className="mt-4 text-xs text-ink/50">
        Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних для зв&apos;язку з вами.
      </p>
    </form>
  );
}
