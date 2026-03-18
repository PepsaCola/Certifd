import type { Metadata } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";

// Налаштовуємо Inter як основний sans-serif шрифт
const inter = Inter({
    subsets: ["latin", "cyrillic"],
    variable: '--font-inter', // Створює CSS-змінну
    display: 'swap',
});

// Налаштовуємо Libre Baskerville як шрифт для заголовків (serif)
const libreBaskerville = Libre_Baskerville({
    subsets: ["latin"],
    weight: ['400', '700'], // Вкажіть потрібні ваги з макету
    variable: '--font-libre-baskerville', // Створює CSS-змінну
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Certifd - Issue and Verify Digital Certificates",
    description: "Platform for issuing trusted digital certificates for universities.",
};

// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="uk" className={`${inter.variable} ${libreBaskerville.variable}`}>
        {/* Додаємо фон прямо сюди */}
        <body className="bg-brand-white  antialiased">
        <main className="min-h-screen">
            {children}
        </main>
        </body>
        </html>
    );
}