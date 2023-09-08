import { TaskAPI } from "@/services";
import { CreateTaskBody } from "@/types";
import { MUTATION_KEY, QUERY_KEY } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation(
    [MUTATION_KEY.CREATE_TASK],
    (data: CreateTaskBody) =>
      TaskAPI.create({
        ...data,
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([QUERY_KEY.TASKS]);
        toast.success("Task created");
      },
      onError: (error) => {
        const axiosErr = error as AxiosError;
        toast.error(axiosErr.message);
      },
    }
  );
};
