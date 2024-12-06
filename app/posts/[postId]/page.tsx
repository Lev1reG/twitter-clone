"use client";

import { Form } from "@/components/form";
import { Header } from "@/components/header";
import { PostItem } from "@/components/posts/post-item";
import { usePost } from "@/hooks/use-post";
import { ClipLoader } from "react-spinners";

const PostView = (
{ params }: { params: { postId: string } }
) => {
  const postId = params.postId; 

  const { data: fetchedPost, isLoading } = usePost(postId);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header
        label="Tweet"
        showBackArrow
      />
      <PostItem data={fetchedPost} />
      <Form 
        postId={postId}
        isComment
        placeholder="Tweet your reply"
      />
    </> 
  );
}

export default PostView;
