import useSWR from "swr";

import fetcher from "@/libs/fetcher";
import { Notification } from "@prisma/client";

export const useNotification = (userId?: string) => {
  const url = userId ? `/api/notifications/${userId}` : null;

  const { data, error, isLoading, mutate } = useSWR<Notification[]>(
    url,
    fetcher,
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
