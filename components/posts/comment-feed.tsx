import { CommentItem } from "@/components/posts/comment-item";

interface CommentFeedProps {
  comments?: Record<string, any>[];
}

export const CommentFeed = ({ comments }: CommentFeedProps) => {
  return (
    <>
      {comments?.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  );
};
