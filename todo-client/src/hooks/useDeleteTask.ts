import { TaskAPI } from "@/services";
import { MUTATION_KEY, QUERY_KEY } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation(
    [MUTATION_KEY.DELETE_TASK],
    (id: string) => TaskAPI.delete(id),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QUERY_KEY.TASKS]);
        toast.success("Task deleted");
      },
      onError: (error) => {
        const axiosErr = error as AxiosError;
        toast.error(axiosErr.message);
      },
    }
  );
};
