import { CommentItem } from "@/components/posts/comment-item";

interface CommentWithUser {
  id: string;
  body: string;
  createdAt: Date | string;
  user: {
    id: string;
    name?: string;
    username?: string;
  };
}

interface CommentFeedProps {
  comments?: CommentWithUser[];
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
