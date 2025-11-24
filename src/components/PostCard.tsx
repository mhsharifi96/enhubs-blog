import Link from "next/link";
import type { PostSummary } from "@/lib/blog";
import { formatDate } from "@/lib/blog";

export function PostCard({ post }: { post: PostSummary }) {
  const categorySlug =
    typeof post.category === "string" ? post.category : post.category?.slug ?? null;
  const categoryLabel =
    typeof post.category === "string" ? post.category : post.category?.name ?? "";
  const tags = (post.tags ?? []).map((tag) =>
    typeof tag === "string" ? { slug: tag, name: tag } : tag
  );

  return (
    <article className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-card">
      <header className="mb-3">
        <Link className="group inline-flex text-slate-900" href={`/posts/${post.slug}`}>
          <h2 className="text-2xl font-semibold transition group-hover:text-primary">{post.title}</h2>
        </Link>
      </header>
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <span>{formatDate(post.created_at)}</span>
        {categorySlug ? (
          <>
            <span>•</span>
            <Link className="text-primary hover:underline" href={`/categories/${categorySlug}`}>
              {categoryLabel || categorySlug}
            </Link>
          </>
        ) : null}
      </div>
      {post.excerpt ? <p className="text-slate-600">{post.excerpt}</p> : null}
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        {tags.map((tag) => (
          <Link
            className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary transition hover:bg-primary/20"
            key={tag.slug}
            href={`/tags/${tag.slug}`}
          >
            #{tag.name}
          </Link>
        ))}
      </div>
    </article>
  );
}
