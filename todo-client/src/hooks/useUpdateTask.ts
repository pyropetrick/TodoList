import { TaskAPI } from "@/services";
import { UpdateTask } from "@/types";
import { MUTATION_KEY, QUERY_KEY } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation(
    [MUTATION_KEY.UPDATE_TASK],
    ({ id, ...task }: UpdateTask) => TaskAPI.update(id.toString(), task),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QUERY_KEY.TASKS]);
        toast.success("Task updated");
      },
      onError: (error) => {
        const axiosErr = error as AxiosError;
        toast.error(axiosErr.message);
      },
    }
  );
};
