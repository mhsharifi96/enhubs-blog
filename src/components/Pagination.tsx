import Link from "next/link";

export function Pagination({
  basePath,
  currentPage,
  totalPages
}: {
  basePath: string;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const prevPage = Math.max(currentPage - 1, 1);
  const nextPage = Math.min(currentPage + 1, totalPages);
  const baseClasses =
    "rounded-full border border-slate-200 px-4 py-1.5 text-slate-700 transition hover:border-primary hover:text-primary";

  const buildHref = (page: number) => {
    return page > 1 ? `${basePath}?page=${page}` : basePath;
  };

  const linkClass = (disabled: boolean) =>
    disabled ? `${baseClasses} cursor-not-allowed opacity-40` : baseClasses;

  return (
    <div className="mt-8 flex items-center justify-center gap-4 text-sm font-medium">
      <Link
        className={linkClass(currentPage === 1)}
        href={buildHref(prevPage)}
        aria-disabled={currentPage === 1}
      >
        قبلی
      </Link>
      <span className="text-slate-500">
        صفحه {currentPage} از {totalPages}
      </span>
      <Link
        className={linkClass(currentPage === totalPages)}
        href={buildHref(nextPage)}
        aria-disabled={currentPage === totalPages}
      >
        بعدی
      </Link>
    </div>
  );
}
