"use client";

import { address, mapLink, schedule, siteConfig } from "@/lib/site-config";
import { useLanguage } from "../shared/LanguageProvider";
import { Reveal } from "../shared/Reveal";
import { ClockIcon, HomeIcon, InstagramIcon, MapPinIcon, PhoneIcon, WhatsappIcon } from "../shared/Icons";
import { Cloud, Flower, Sun } from "../shared/Decor";

export function Contacts() {
  const { t, lang } = useLanguage();
  const c = t.contacts;

  const rows = [
    { Icon: HomeIcon, tone: "bg-sun", label: c.nameLabel, value: <span lang="kk">{siteConfig.name}</span> },
    { Icon: MapPinIcon, tone: "bg-apricot", label: c.addressLabel, value: address[lang] },
    {
      Icon: PhoneIcon,
      tone: "bg-coral-soft",
      label: c.phoneLabel,
      value: (
        <a href={siteConfig.phone.href} className="underline decoration-coral decoration-2 underline-offset-4 hover:decoration-terracotta">
          {siteConfig.phone.display}
        </a>
      ),
    },
    {
      Icon: ClockIcon,
      tone: "bg-sage",
      label: c.scheduleLabel,
      value: (
        <span className="block">
          {c.weekdays}: {schedule.weekdays.open}–{schedule.weekdays.close}
          {schedule.weekendClosed && (
            <span className="block text-cocoa-soft">
              {c.weekend}: {c.dayOff}
            </span>
          )}
        </span>
      ),
    },
  ];

  return (
    <section id="contacts" aria-labelledby="contacts-title" className="relative overflow-hidden bg-coral-tint py-16 min-[1400px]:py-20">
      <Cloud className="absolute top-10 right-[6%] w-28 animate-sway [animation-delay:-2s]" />

      <div className="mx-auto max-w-6xl px-6 xl:px-8">
        <Reveal className="text-center">
          <p className="text-sm font-semibold text-terracotta-deep">{c.eyebrow}</p>
          <h2 id="contacts-title" className="mt-2 text-3xl leading-tight font-extrabold xl:text-[2.1rem]">
            {c.title}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-[1.25fr_0.75fr] gap-6">
          <Reveal className="rounded-[40px_40px_40px_120px] bg-milk px-9 py-8 shadow-soft">
            <dl className="grid gap-5">
              {rows.map(({ Icon, tone, label, value }) => (
                <div key={label} className="flex gap-4">
                  <span className={`grid size-11 shrink-0 place-items-center rounded-full text-cocoa ${tone}`}>
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-sm font-semibold text-terracotta-deep">{label}</dt>
                    <dd className="mt-0.5 text-[1.05rem] leading-snug font-medium">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120} className="relative flex flex-col justify-center gap-3 rounded-[160px_160px_40px_40px] bg-apricot px-9 pt-16 pb-9">
            <Sun className="absolute -top-6 left-1/2 size-16 -translate-x-1/2 animate-spin-slow" />
            <Flower className="absolute right-6 bottom-5 size-8 animate-spin-slow" color="#FFFBF5" />
            <a
              href={siteConfig.phone.href}
              className="flex items-center justify-center gap-2.5 rounded-full bg-terracotta px-6 py-3.5 font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-terracotta-deep hover:shadow-lift"
            >
              <PhoneIcon className="size-5" />
              {c.call}
            </a>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-full bg-milk px-6 py-3.5 font-semibold text-cocoa shadow-soft transition hover:-translate-y-0.5 hover:bg-sun-soft hover:shadow-lift"
            >
              <InstagramIcon className="size-5" />
              {c.instagram}
              <span className="sr-only">
                {siteConfig.instagram.handle} ({t.a11y.opensInNewTab})
              </span>
            </a>
            {siteConfig.whatsappUrl && (
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 rounded-full bg-milk px-6 py-3.5 font-semibold text-cocoa shadow-soft transition hover:-translate-y-0.5 hover:bg-sun-soft hover:shadow-lift"
              >
                <WhatsappIcon className="size-5" />
                {c.whatsapp}
                <span className="sr-only">({t.a11y.opensInNewTab})</span>
              </a>
            )}
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-full border-2 border-terracotta bg-milk px-6 py-3 font-semibold text-terracotta-deep transition hover:-translate-y-0.5 hover:bg-milk"
            >
              <MapPinIcon className="size-5" />
              {c.map}
              <span className="sr-only">({t.a11y.opensInNewTab})</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
