import useSWR from "swr";

import fetcher from "@/libs/fetcher";
import { User } from "@prisma/client";

export const useUsers = () => {
  const { 
    data, 
    error, 
    isLoading, 
    mutate 
  } = useSWR<User[]>("/api/users", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
}
