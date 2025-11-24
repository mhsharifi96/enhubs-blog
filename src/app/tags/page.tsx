import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "../(shared)/PageHero";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import { getAllTags } from "@/lib/blog";

export const metadata: Metadata = {
  title: "برچسب‌ها",
  description: "برچسب‌های پر استفاده در وبلاگ"
};

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <>
      <PageHero title="برچسب‌ها" description="به کمک برچسب‌ها سریع‌تر جستجو کنید" />
      <div className="grid gap-4 md:grid-cols-2">
        {tags.map((tag) => (
          <Link
            key={tag.slug}
            className="rounded-2xl border border-slate-200 bg-surface p-5 shadow-card transition hover:-translate-y-0.5 hover:border-primary/50"
            href={`/tags/${tag.slug}`}
          >
            <h3 className="text-xl font-semibold text-slate-900">#{tag.name}</h3>
          </Link>
        ))}
      </div>
      <BackToHomeButton className="mt-8" />
    </>
  );
}
