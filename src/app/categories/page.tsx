import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "../(shared)/PageHero";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import { getAllCategories } from "@/lib/blog";

export const metadata: Metadata = {
  title: "دسته‌بندی‌ها",
  description: "همه موضوعات موجود در بلاگ"
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <>
      <PageHero
        title="دسته‌بندی‌ها"
        description="موضوع مورد نظر خود را انتخاب کنید"
      />
      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            className="rounded-2xl border border-slate-200 bg-surface p-5 shadow-card transition hover:-translate-y-0.5 hover:border-primary/50"
            href={`/categories/${category.slug}`}
          >
            <h3 className="text-xl font-semibold text-slate-900">{category.name}</h3>
            {category.description ? (
              <p className="mt-2 text-sm text-slate-500">{category.description}</p>
            ) : null}
          </Link>
        ))}
      </div>
      <BackToHomeButton className="mt-8" />
    </>
  );
}
