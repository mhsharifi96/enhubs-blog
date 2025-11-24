const DEFAULT_BASE_URL = "http://127.0.0.1:8000/api/blog";
const rawBaseUrl =
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_BASE_URL;
const normalizedBaseUrl = rawBaseUrl.replace(/\/$/, "");

export const PAGE_SIZE = Number(process.env.API_PAGE_SIZE ?? "6");

export type ApiListResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  meta_title: string;
  meta_description: string;
  created_at: string;
  updated_at: string;
};

export type Tag = {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

export type PostSummary = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  is_published: boolean;
  meta_title: string;
  meta_description: string;
  created_at: string;
  updated_at: string;
};

export type PostDetail = PostSummary & {
  content?: string;
};

export type PaginatedResult<T> = {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
};

type FetchOptions = {
  searchParams?: Record<string, string | number | undefined>;
  cache?: RequestCache;
};

function buildUrl(path: string) {
  const trimmedPath = path.replace(/^\/+/, "");
  return `${normalizedBaseUrl}/${trimmedPath}`;
}

const DEFAULT_REVALIDATE_SECONDS = Number(process.env.API_REVALIDATE_SECONDS ?? "60");

async function fetchFromApi<T>(path: string, options: FetchOptions = {}) {
  const { searchParams, cache } = options;
  const url = new URL(buildUrl(path));

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const requestInit: RequestInit & { next?: { revalidate?: number } } = {
    headers: {
      Accept: "application/json"
    }
  };

  if (cache) {
    requestInit.cache = cache;
  } else if (DEFAULT_REVALIDATE_SECONDS > 0) {
    requestInit.next = { revalidate: DEFAULT_REVALIDATE_SECONDS };
  }

  const response = await fetch(url.toString(), requestInit);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function getAllCategories() {
  const data = await fetchFromApi<ApiListResponse<Category>>("categories/", {
    searchParams: { page_size: "100" }
  });
  return data.results;
}

export async function getCategoryBySlug(slug: string) {
  return fetchFromApi<Category>(`categories/${slug}/`);
}

export async function getAllTags() {
  const data = await fetchFromApi<ApiListResponse<Tag>>("tags/", {
    searchParams: { page_size: "100" }
  });
  return data.results;
}

export async function getTagBySlug(slug: string) {
  return fetchFromApi<Tag>(`tags/${slug}/`);
}

async function fetchPosts(options: { page?: number; category?: string; tag?: string } = {}) {
  const { page = 1, category, tag } = options;
  const safePage = Math.max(page, 1);
  const data = await fetchFromApi<ApiListResponse<PostSummary>>("posts/", {
    searchParams: {
      page: String(safePage),
      page_size: String(PAGE_SIZE),
      category,
      tags: tag
    }
  });

  const totalPages = Math.max(1, Math.ceil(data.count / PAGE_SIZE));
  const currentPage = Math.min(safePage, totalPages);

  return {
    items: data.results,
    totalItems: data.count,
    currentPage,
    totalPages,
    pageSize: PAGE_SIZE
  } satisfies PaginatedResult<PostSummary>;
}

export async function getPostsByPage(page = 1) {
  return fetchPosts({ page });
}

export async function getPostsByCategory(slug: string, page = 1) {
  return fetchPosts({ page, category: slug });
}

export async function getPostsByTag(slug: string, page = 1) {
  return fetchPosts({ page, tag: slug });
}

export async function getPostBySlug(slug: string) {
  return fetchFromApi<PostDetail>(`posts/${slug}/`);
}

export function formatDate(date: string) {
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    }).format(new Date(date));
  } catch (error) {
    return date;
  }
}
