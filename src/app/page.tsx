import { PageHero } from "./(shared)/PageHero";
import { PostList } from "@/components/PostList";
import { Pagination } from "@/components/Pagination";
import { getPostsByPage } from "@/lib/blog";

export default async function HomePage({
  searchParams
}: {
  searchParams?: { page?: string };
}) {
  const parsedPage = Number(searchParams?.page ?? "1");
  const safePage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const { items, currentPage, totalPages } = await getPostsByPage(safePage);

  return (
    <>
      <PageHero
        title="وبلاگ EN Hub"
        description="یادداشت‌ها و آموزش‌های کوتاه درباره توسعه وب و مدیریت محتوا"
      />
      <PostList posts={items} />
      <Pagination basePath="/" currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
