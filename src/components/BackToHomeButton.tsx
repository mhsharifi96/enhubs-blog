import Link from "next/link";

export function BackToHomeButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-primary hover:text-primary ${className}`.trim()}
    >
      بازگشت به صفحه اصلی
    </Link>
  );
}
