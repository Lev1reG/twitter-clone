import useSWR from "swr";

import fetcher from "@/libs/fetcher";
import { Post } from "@prisma/client";

export const usePosts = (userId?: string) => {
  const url = userId ? `/api/posts?userId=${userId}` : "/api/posts";

  const { data, error, isLoading, mutate } = useSWR<Post[]>(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
