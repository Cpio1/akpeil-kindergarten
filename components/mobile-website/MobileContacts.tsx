"use client";

import { address, mapLink, schedule, siteConfig } from "@/lib/site-config";
import { useLanguage } from "../shared/LanguageProvider";
import { Reveal } from "../shared/Reveal";
import { ClockIcon, HomeIcon, InstagramIcon, MapPinIcon, PhoneIcon, WhatsappIcon } from "../shared/Icons";
import { Cloud, Sun } from "../shared/Decor";

export function MobileContacts() {
  const { t, lang } = useLanguage();
  const c = t.contacts;

  const rows = [
    { Icon: HomeIcon, label: c.nameLabel, value: <span lang="kk">{siteConfig.name}</span> },
    { Icon: MapPinIcon, label: c.addressLabel, value: address[lang] },
    {
      Icon: PhoneIcon,
      label: c.phoneLabel,
      value: (
        <a href={siteConfig.phone.href} className="underline decoration-honey decoration-2 underline-offset-4">
          {siteConfig.phone.display}
        </a>
      ),
    },
    {
      Icon: ClockIcon,
      label: c.scheduleLabel,
      value: (
        <>
          {c.weekdays}: {schedule.weekdays.open}–{schedule.weekdays.close}
          {schedule.weekendClosed && (
            <span className="block text-cocoa-soft">
              {c.weekend}: {c.dayOff}
            </span>
          )}
        </>
      ),
    },
  ];

  const buttonBase = "flex min-h-12 items-center justify-center gap-2.5 rounded-full px-5 font-semibold active:scale-[0.98]";

  return (
    <section id="contacts" aria-labelledby="m-contacts-title" className="relative overflow-hidden bg-sand-soft py-12">
      <Cloud className="absolute top-6 -right-6 w-20 animate-sway opacity-90" />

      <div className="mx-auto max-w-2xl px-4">
        <Reveal>
          <p className="text-sm font-semibold text-honey-deep">{c.eyebrow}</p>
          <h2 id="m-contacts-title" className="mt-1.5 pr-14 text-[1.6rem] leading-tight font-extrabold sm:text-3xl">
            {c.title}
          </h2>
        </Reveal>

        <Reveal className="mt-6 rounded-[32px_32px_32px_80px] bg-milk px-5 py-6 shadow-soft">
          <dl className="grid gap-4">
            {rows.map(({ Icon, label, value }) => (
              <div key={label} className="flex gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sand">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <dt className="text-sm font-semibold text-honey-deep">{label}</dt>
                  <dd className="mt-0.5 leading-snug font-medium">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="relative mt-5 grid gap-2.5 rounded-[110px_110px_32px_32px] bg-apricot-soft px-5 pt-12 pb-6">
          <Sun className="absolute -top-5 left-1/2 size-12 -translate-x-1/2 animate-spin-slow" />
          <a href={siteConfig.phone.href} className={`${buttonBase} bg-cocoa text-milk shadow-soft`}>
            <PhoneIcon className="size-5" />
            {c.call}
          </a>
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonBase} bg-milk shadow-soft`}
          >
            <InstagramIcon className="size-5" />
            {c.instagram}
            <span className="sr-only">
              {siteConfig.instagram.handle} ({t.a11y.opensInNewTab})
            </span>
          </a>
          {siteConfig.whatsappUrl && (
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${buttonBase} bg-milk shadow-soft`}>
              <WhatsappIcon className="size-5" />
              {c.whatsapp}
              <span className="sr-only">({t.a11y.opensInNewTab})</span>
            </a>
          )}
          <a href={mapLink} target="_blank" rel="noopener noreferrer" className={`${buttonBase} border-2 border-cocoa/80`}>
            <MapPinIcon className="size-5" />
            {c.map}
            <span className="sr-only">({t.a11y.opensInNewTab})</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
