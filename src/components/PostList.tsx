import type { PostSummary } from "@/lib/blog";
import { PostCard } from "./PostCard";

export function PostList({ posts }: { posts: PostSummary[] }) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
