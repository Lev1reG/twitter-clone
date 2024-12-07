import useSWR from "swr";

import fetcher from "@/libs/fetcher";
import { Post } from "@prisma/client";
import { ExtendedPost } from "@/types";

export const usePosts = (userId?: string) => {
  const url = userId ? `/api/posts?userId=${userId}` : "/api/posts";

  const { data, error, isLoading, mutate } = useSWR<ExtendedPost[]>(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
