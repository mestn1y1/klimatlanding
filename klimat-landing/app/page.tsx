import LeadForm from "@/components/LeadForm";
import { ADVANTAGES, FAQ, PRICES, REVIEWS, SITE, STEPS } from "@/lib/config";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: SITE.brand,
  areaServed: SITE.city,
  telephone: SITE.phone,
  openingHours: "Mo-Su 08:00-20:00",
  description: "Монтаж і установка кондиціонерів та спліт-систем",
};

function Check() {
  return (
    <svg className="mt-1 h-4 w-4 shrink-0 text-sky" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Верхня панель */}
      <header className="sticky top-0 z-30 border-b border-ink/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top" className="font-display text-lg font-extrabold tracking-tight text-ink">
            {SITE.brand}
          </a>
          <nav className="hidden gap-6 text-sm font-medium text-ink/70 md:flex">
            <a href="#prices" className="hover:text-ink">Ціни</a>
            <a href="#steps" className="hover:text-ink">Як працюємо</a>
            <a href="#faq" className="hover:text-ink">Питання</a>
          </nav>
          <a
            href={`tel:${SITE.phone}`}
            className="rounded-full bg-sky-deep px-4 py-2 text-sm font-bold text-white hover:brightness-110"
          >
            {SITE.phoneDisplay}
          </a>
        </div>
      </header>

      <main id="top">
        {/* Перший екран */}
        <section className="bg-gradient-to-b from-frost to-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-24">
            <div>
              <p className="inline-block rounded-full bg-ice px-3 py-1 text-xs font-bold uppercase tracking-wide text-sky-deep">
                {SITE.city}
              </p>
              <h1 className="font-display mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Монтаж кондиціонерів <span className="text-sky-deep">за один день</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-ink/70">
                Фіксована ціна до початку робіт, акуратна установка і гарантія {SITE.warrantyYears} роки на монтаж.
                Працюємо з обладнанням будь-якого виробника.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#lead"
                  className="rounded-xl bg-ember px-7 py-4 text-center font-display text-lg font-bold text-white shadow-lg shadow-ember/30 hover:brightness-110"
                >
                  Розрахувати вартість
                </a>
                <a
                  href={`tel:${SITE.phone}`}
                  className="rounded-xl border-2 border-ink/15 px-7 py-4 text-center font-display text-lg font-bold hover:border-ink/40"
                >
                  Зателефонувати
                </a>
              </div>

              <ul className="mt-8 grid gap-2 text-sm text-ink/70 sm:grid-cols-2">
                <li className="flex gap-2"><Check />Виїзд майстра для розрахунку</li>
                <li className="flex gap-2"><Check />Договір і акт виконаних робіт</li>
                <li className="flex gap-2"><Check />Прибираємо після монтажу</li>
                <li className="flex gap-2"><Check />{SITE.workHours}</li>
              </ul>
            </div>

            <LeadForm id="lead" />
          </div>
        </section>

        {/* Переваги */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Чому обирають нас</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANTAGES.map((a) => (
              <div key={a.title} className="rounded-2xl border border-ink/10 p-6">
                <p className="font-display text-lg font-bold">{a.title}</p>
                <p className="mt-2 text-sm text-ink/70">{a.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ціни */}
        <section id="prices" className="bg-ink py-16 text-white">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Скільки це коштує</h2>
            <p className="mt-2 text-white/60">Точну суму назвемо після огляду, до початку робіт.</p>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {PRICES.map((p) => (
                <div
                  key={p.name}
                  className={`flex flex-col rounded-2xl p-6 ${
                    p.highlighted ? "bg-sky text-ink ring-4 ring-ice/40" : "bg-white/5 ring-1 ring-white/15"
                  }`}
                >
                  <p className="font-display text-xl font-bold">{p.name}</p>
                  <p className={`text-sm ${p.highlighted ? "text-ink/70" : "text-white/60"}`}>{p.note}</p>
                  <p className="font-display mt-4 text-3xl font-extrabold">{p.price}</p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <Check />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#lead"
                    className={`mt-6 rounded-xl px-5 py-3 text-center font-bold ${
                      p.highlighted ? "bg-ink text-white" : "bg-white text-ink"
                    } hover:brightness-110`}
                  >
                    Замовити
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Етапи */}
        <section id="steps" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Як ми працюємо</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-2xl bg-frost p-6">
                <span className="font-display text-4xl font-extrabold text-sky-deep">{i + 1}</span>
                <p className="font-display mt-2 text-lg font-bold">{s.title}</p>
                <p className="mt-2 text-sm text-ink/70">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Відгуки: з'являються лише коли додаш справжні в lib/config.ts */}
        {REVIEWS.length > 0 && (
          <section className="bg-frost py-16">
            <div className="mx-auto max-w-6xl px-4">
              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Відгуки клієнтів</h2>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {REVIEWS.map((r) => (
                  <figure key={r.name + r.text} className="rounded-2xl bg-white p-6 shadow-sm">
                    <blockquote className="text-ink/80">{r.text}</blockquote>
                    <figcaption className="mt-4 text-sm font-bold">
                      {r.name} <span className="font-normal text-ink/50">· {r.place}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Часті питання</h2>
          <div className="mt-8 divide-y divide-ink/10 rounded-2xl border border-ink/10">
            {FAQ.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-bold">
                  {f.q}
                  <span className="text-sky-deep transition group-open:rotate-45 text-2xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-ink/70">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Фінальний заклик */}
        <section className="bg-sky-deep py-16 text-center text-white">
          <div className="mx-auto max-w-2xl px-4">
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Готові замовити монтаж?</h2>
            <p className="mt-3 text-white/80">Зателефонуйте або напишіть, і ми підберемо зручний день.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={`tel:${SITE.phone}`} className="rounded-xl bg-white px-7 py-4 font-display font-bold text-ink">
                {SITE.phoneDisplay}
              </a>
              <a
                href={`https://t.me/${SITE.telegram}`}
                className="rounded-xl bg-white/15 px-7 py-4 font-display font-bold ring-1 ring-white/40"
              >
                Telegram
              </a>
              <a
                href={`viber://chat?number=%2B${SITE.viber}`}
                className="rounded-xl bg-white/15 px-7 py-4 font-display font-bold ring-1 ring-white/40"
              >
                Viber
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink py-8 text-center text-sm text-white/50">
        © {new Date().getFullYear()} {SITE.brand}. Монтаж кондиціонерів, {SITE.city}.
      </footer>

      {/* Плаваюча кнопка дзвінка на мобільному */}
      <a
        href={`tel:${SITE.phone}`}
        className="fixed bottom-4 right-4 z-40 rounded-full bg-ember px-5 py-3 font-display font-bold text-white shadow-lg md:hidden"
      >
        Зателефонувати
      </a>
    </>
  );
}
