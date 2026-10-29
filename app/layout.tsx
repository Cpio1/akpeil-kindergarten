import type { Metadata, Viewport } from "next";
import { Golos_Text, Nunito } from "next/font/google";
import { LanguageProvider } from "@/components/shared/LanguageProvider";
import { dictionaries } from "@/lib/translations";
import "./globals.css";

// Оба шрифта содержат кириллицу и расширенную кириллицу: ә, ғ, қ, ң, ө, ұ, ү, һ, і.
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["cyrillic", "cyrillic-ext", "latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const golos = Golos_Text({
  variable: "--font-golos",
  subsets: ["cyrillic", "cyrillic-ext", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const { meta } = dictionaries.kk;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  applicationName: "Ақпейіл",
  openGraph: {
    title: meta.title,
    description: meta.description,
    type: "website",
    locale: "kk_KZ",
    alternateLocale: "ru_RU",
    siteName: "Ақпейіл бөбекжай-бақшасы",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#FFF8EE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="kk" className={`${nunito.variable} ${golos.variable} antialiased`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
