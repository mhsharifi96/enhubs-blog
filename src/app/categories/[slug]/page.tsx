import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "../../(shared)/PageHero";
import { PostList } from "@/components/PostList";
import { Pagination } from "@/components/Pagination";
import { BackToHomeButton } from "@/components/BackToHomeButton";
import { getCategoryBySlug, getPostsByCategory } from "@/lib/blog";

type PageProps = {
  params: { slug: string };
  searchParams?: { page?: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const category = await getCategoryBySlug(params.slug);
    return {
      title: category.meta_title || `دسته ${category.name}`,
      description: category.meta_description || category.description
    };
  } catch (error) {
    return { title: "دسته‌بندی" };
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const category = await getCategoryBySlug(params.slug).catch(() => null);
  if (!category) {
    notFound();
  }

  const parsedPage = Number(searchParams?.page ?? "1");
  const safePage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const { items, currentPage, totalPages } = await getPostsByCategory(category.slug, safePage);

  return (
    <>
      <PageHero title={category.name} description={category.description} />
      <PostList posts={items} />
      <Pagination
        basePath={`/categories/${category.slug}`}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      <BackToHomeButton className="mt-8" />
    </>
  );
}
