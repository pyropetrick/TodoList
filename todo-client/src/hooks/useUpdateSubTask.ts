import { SubTaskAPI } from "@/services";
import { UpdateTask } from "@/types";
import { MUTATION_KEY, QUERY_KEY } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const useUpdateSubTask = () => {
  const queryClient = useQueryClient();
  return useMutation(
    [MUTATION_KEY.UPDATE_SUBTASK],
    ({ id, ...task }: UpdateTask) => SubTaskAPI.update(id.toString(), task),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QUERY_KEY.TASKS]);
        toast.success("SubTask updated");
      },
      onError: (error) => {
        const axiosErr = error as AxiosError;
        toast.error(axiosErr.message);
      },
    }
  );
};
