"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useLoginModal } from "@/hooks/use-login-modal";
import { usePosts } from "@/hooks/use-posts";
import { useRegisterModal } from "@/hooks/use-register-modal";
import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/button";
import { Avatar } from "@/components/avatar";
import { usePost } from "@/hooks/use-post";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

export const Form = ({ placeholder, isComment, postId }: FormProps) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";

      await axios.post(url, {
        body,
      });

      toast.success("Tweet Created.");

      setBody("");
      mutatePosts();
      mutatePost();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, mutatePost, isComment, postId]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              className="
                disable:opacity-80
                peer
                resize-none
                mt-3
                w-full
                bg-black
                ring-0
                outline-none
                text-[20px]
                placeholder-neutral-500
                text-white
              "
              placeholder={placeholder}
            ></textarea>
            <hr
              className="
                opacity-0
                peer-focus:opacity-100
                h-[1px]
                w-full
                border-neutral-800
                transition
              "
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button
                label="Tweet"
                disabled={isLoading || !body}
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1
            className="
            text-white
            text-2xl
            text-center
            mb-4
            font-bold
          "
          >
            Welcome to Twitter Clone, made by Deren
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};
