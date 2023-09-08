import { TaskAPI } from "@/services";
import { QUERY_KEY } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export const useTasks = () => {
  return useQuery([QUERY_KEY.TASKS], () => TaskAPI.getAll(), {
    select: ({ data }) => data,
  });
};
