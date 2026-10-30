import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Lead = {
  name?: unknown;
  phone?: unknown;
  comment?: unknown;
  website?: unknown;
};

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[<>]/g, "").trim().slice(0, max) : "";

export async function POST(req: Request) {
  let body: Lead;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Якщо бот заповнив приховане поле, вдаємо успіх і нічого не надсилаємо
  if (clean(body.website, 100)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 60);
  const phone = clean(body.phone, 18);
  const comment = clean(body.comment, 500);

  if (name.length < 2 || !/^[+0-9()\s-]{10,18}$/.test(phone)) {
    return NextResponse.json(
      { ok: false, error: "validation" },
      { status: 422 },
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    // Локальна розробка без бота: просто пишемо в консоль
    console.log("[lead]", { name, phone, comment });
    return NextResponse.json({ ok: true });
  }

  const text = `Нова заявка з сайту\nІм'я: ${name}\nТелефон: ${phone}${comment ? `\nКоментар: ${comment}` : ""}`;

  try {
    console.log("USING TOKEN:", token ? token.slice(0, 5) + "..." : "MISSING");
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      },
    );
    if (!res.ok) throw new Error(`telegram ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] send failed", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
