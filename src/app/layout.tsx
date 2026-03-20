import type { Metadata } from "next";
import { Inter, Libre_Baskerville, IBM_Plex_Sans } from "next/font/google"; // 1. Додали імпорт
import "./globals.css";

// (Ваші попередні шрифти залишаються, якщо вони ще потрібні)
const inter = Inter({ subsets: ["latin", "cyrillic"], variable: '--font-inter', display: 'swap' });
const libreBaskerville = Libre_Baskerville({ subsets: ["latin"], weight: ['400', '700'], variable: '--font-libre-baskerville', display: 'swap' });

// 2. Налаштовуємо IBM Plex Sans
const ibmPlexSans = IBM_Plex_Sans({
    subsets: ["latin", "cyrillic"], // cyrillic потрібен, якщо буде український/російський текст
    weight: ['300', '400', '500', '600', '700'], // Вкажіть ваги, які є у вашому макеті Figma
    variable: '--font-ibm-plex-sans', // Створюємо змінну
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Certifd - Issue and Verify Digital Certificates",
    description: "Platform for issuing trusted digital certificates for universities.",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        // 3. Додаємо змінну шрифту в className тегу html
        <html lang="uk" className={`${inter.variable} ${libreBaskerville.variable} ${ibmPlexSans.variable}`}>
        <body className="antialiased text-brand-dark">
        <main className="min-h-screen">
            {children}
        </main>
        </body>
        </html>
    );
}