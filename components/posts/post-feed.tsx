"use client";

import usePosts from "@/hooks/use-posts";
import { PostItem } from "@/components/posts/post-item";

interface PostFeedProps {
  userId?: string;
}

export const PostFeed = ({ userId }: PostFeedProps) => {
  const { data: posts = [] } = usePosts(userId);

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
};
