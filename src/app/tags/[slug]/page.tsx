import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "../../(shared)/PageHero";
import { PostList } from "@/components/PostList";
import { Pagination } from "@/components/Pagination";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import { getPostsByTag, getTagBySlug } from "@/lib/blog";

type PageProps = {
  params: { slug: string };
  searchParams?: { page?: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const tag = await getTagBySlug(params.slug);
    return {
      title: tag.name ? `برچسب ${tag.name}` : "برچسب",
      description: `نوشته‌های دارای برچسب ${tag.name}`
    };
  } catch (error) {
    return { title: "برچسب" };
  }
}

export default async function TagPage({ params, searchParams }: PageProps) {
  const tag = await getTagBySlug(params.slug).catch(() => null);
  if (!tag) {
    notFound();
  }

  const parsedPage = Number(searchParams?.page ?? "1");
  const safePage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const { items, currentPage, totalPages } = await getPostsByTag(tag.slug, safePage);

  return (
    <>
      <PageHero title={`برچسب ${tag.name}`} description="مطالب مرتبط" />
      <PostList posts={items} />
      <Pagination
        basePath={`/tags/${tag.slug}`}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      <BackToHomeButton className="mt-8" />
    </>
  );
}
