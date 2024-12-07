"use client";

import { usePosts } from "@/hooks/use-posts";
import { PostItem } from "@/components/posts/post-item";
import { ExtendedPost } from "@/types";

interface PostFeedProps {
  userId?: string;
}

export const PostFeed = ({ userId }: PostFeedProps) => {
  const { data: posts = [] } = usePosts(userId);

  return (
    <>
      {posts.map((post: ExtendedPost) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
};
