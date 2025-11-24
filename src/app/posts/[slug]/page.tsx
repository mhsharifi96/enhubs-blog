import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "../../(shared)/PageHero";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import { getCategoryBySlug, getPostBySlug, formatDate } from "@/lib/blog";
import { markdownToHtml } from "@/lib/markdown";

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);
    return {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt
    };
  } catch (error) {
    return { title: "نوشته" };
  }
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug).catch(() => null);
  if (!post) {
    notFound();
  }

  const categorySlug =
    typeof post.category === "string" ? post.category : post.category?.slug ?? null;
  const categoryFallbackName =
    typeof post.category === "string" ? post.category : post.category?.name ?? null;
  const category = categorySlug
    ? await getCategoryBySlug(categorySlug).catch(() => null)
    : null;
  const contentHtml = markdownToHtml(post.content ?? post.excerpt ?? "");
  const tags = (post.tags ?? []).map((tag) =>
    typeof tag === "string" ? { slug: tag, name: tag } : tag
  );

  return (
    <>
      <PageHero title={post.title} description={post.excerpt} />
      <article className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-card">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <span>{formatDate(post.created_at)}</span>
          {categorySlug ? (
            <>
              <span>•</span>
              <Link
                className="text-primary hover:underline"
                href={`/categories/${category?.slug ?? categorySlug}`}
              >
                {category?.name ?? categoryFallbackName ?? categorySlug}
              </Link>
            </>
          ) : null}
        </div>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.slug}
              className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary transition hover:bg-primary/20"
              href={`/tags/${tag.slug}`}
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </article>
      <BackToHomeButton className="mt-8" />
    </>
  );
}
