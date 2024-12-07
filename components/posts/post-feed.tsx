"use client";

import { usePosts } from "@/hooks/use-posts";
import { PostItem } from "@/components/posts/post-item";
import { Post } from "@prisma/client";

interface PostFeedProps {
  userId?: string;
}

export const PostFeed = ({ userId }: PostFeedProps) => {
  const { data: posts = [] } = usePosts(userId);

  return (
    <>
      {posts.map((post: Post) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
};
