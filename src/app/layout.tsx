import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";
import { vazir } from "./fonts";




export const metadata: Metadata = {
  title: {
    template: "%s |Blog LangAgent",
    default: "LangAgent"
  },
  description: "LangAgent Blog - Articles and tutorials about Learning English language with AI agents.",
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="rtl">
      <body className={`${vazir.variable} flex min-h-screen flex-col bg-background font-vazir`}>
        <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-surface/90 backdrop-blur">
          <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-4 px-6 py-4">
            <Link className="text-xl font-semibold text-slate-900" href="/">
              LangAgent
            </Link>
            <nav className="flex flex-1 flex-wrap items-center justify-end gap-4 text-sm font-semibold text-slate-500">
              <Link className="transition hover:text-primary" href="/">
                خانه
              </Link>
              <Link className="transition hover:text-primary" href="/categories">
                دسته‌بندی‌ها
              </Link>
              <Link className="transition hover:text-primary" href="/tags">
                برچسب‌ها
              </Link>
              <Link className="transition hover:text-primary" href="/about">
                درباره
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">{children}</main>
        <footer className="border-t border-slate-200 bg-surface/70">
          <div className="mx-auto w-full max-w-4xl px-6 py-6 text-sm text-slate-500">
            © {new Date().getFullYear()} LangAgent. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
