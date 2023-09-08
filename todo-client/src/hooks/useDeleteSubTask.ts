import { SubTaskAPI } from "@/services";
import { MUTATION_KEY, QUERY_KEY } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const useDeleteSubTask = () => {
  const queryClient = useQueryClient();
  return useMutation(
    [MUTATION_KEY.DELETE_SUBTASK],
    (id: string) => SubTaskAPI.delete(id),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([QUERY_KEY.TASKS]);
        toast.success("SubTask deleted");
      },
      onError: (error) => {
        const axiosErr = error as AxiosError;
        toast.error(axiosErr.message);
      },
    }
  );
};
