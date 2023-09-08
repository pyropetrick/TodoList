import { SubTaskAPI } from "@/services";
import { Task } from "@/types";
import { MUTATION_KEY, QUERY_KEY } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

type CreateSubtaskArgs = {
  id: string;
} & Task;

export const useCreateSubTask = () => {
  const queryClient = useQueryClient();
  return useMutation(
    [MUTATION_KEY.CREATE_SUBTASK],
    ({ id, ...task }: CreateSubtaskArgs) => SubTaskAPI.create(id, task),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QUERY_KEY.TASKS]);
        toast.success("SubTask created");
      },
      onError: (error) => {
        const axiosErr = error as AxiosError;
        toast.error(axiosErr.message);
      },
    }
  );
};
