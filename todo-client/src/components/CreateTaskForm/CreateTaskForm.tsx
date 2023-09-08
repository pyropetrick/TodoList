import { useCreateTask } from "@/hooks";
import { Task } from "@/types";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateModal, FormInputs } from "..";
import { STATUS } from "@/utils";

export const CreateTaskForm = () => {
  const [subtasks, setSubtasks] = useState<Task[]>([]);
  const [isSubtaskForm, setIsSubtaskForm] = useState<boolean>(false);
  const { handleSubmit, register, reset } = useForm<Task>();
  const { mutate } = useCreateTask();
  const onSubmit: SubmitHandler<Task> = async (data) => {
    mutate({ ...data, subtasks });
    setSubtasks([]);
    reset();
  };

  const toggleModal = useCallback(() => {
    setIsSubtaskForm((prev) => !prev);
  }, []);

  const onSaveSubForm = useCallback((data: Task) => {
    setSubtasks((prev) => [...prev, data]);
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <h2>Create new Task</h2>
        <FormInputs register={register} />
        {subtasks.map((subtask, index) => (
          <div
            key={index}
            className={`p-2 border-2 rounded-sm ${
              subtask.status === STATUS.COMPLETED && "line-through"
            }`}
          >
            {subtask.content}
          </div>
        ))}
        <div className="flex align-middle gap-4">
          <button
            type="submit"
            className="p-2 w-full rounded-sm border-2 border-black "
          >
            Add task
          </button>
          <button
            className="p-2 w-full rounded-sm border-2 border-black"
            type="button"
            onClick={toggleModal}
          >
            Add Subtask
          </button>
        </div>
      </form>
      {isSubtaskForm && (
        <CreateModal
          isVisible={isSubtaskForm}
          hideModal={toggleModal}
          saveTask={onSaveSubForm}
        />
      )}
    </>
  );
};
