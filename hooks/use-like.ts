import { useCallback, useMemo } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useLoginModal } from "@/hooks/use-login-modal";
import { usePost } from "@/hooks/use-post";
import { usePosts } from "@/hooks/use-posts";
import toast from "react-hot-toast";
import axios from "axios";

interface useLikeProps {
  postId: string;
  userId?: string;
}

export const useLike = ({ postId, userId }: useLikeProps) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [currentUser?.id, fetchedPost?.likedIds]);

  const toogleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasLiked) {
        request = () =>
          axios.delete("/api/like", {
            data: { postId },
          });
      } else {
        request = () =>
          axios.post("/api/like", {
            postId,
          });
      }

      await request();

      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }, [
    currentUser,
    hasLiked,
    postId,
    mutateFetchedPost,
    mutateFetchedPosts,
    loginModal,
  ]);

  return {
    hasLiked,
    toogleLike,
  };
};
