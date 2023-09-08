import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Task } from "@/types";
import { FormInputs } from "..";
import { Modal } from "./Modal";

type Props = {
  isVisible: boolean;
  hideModal: () => void;
  saveTask: (data: Task) => void;
  defaultValues: Task;
};

export const EditModal: FC<Props> = ({
  isVisible,
  hideModal,
  saveTask,
  defaultValues,
}) => {
  console.log(defaultValues);
  const { handleSubmit, register, reset } = useForm<Task>({ defaultValues });
  const onSubmit: SubmitHandler<Task> = (data) => {
    saveTask(data);
    reset();
    hideModal();
  };

  return (
    <Modal isVisible={isVisible} hideModal={hideModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormInputs register={register} />
        <button
          type="submit"
          className="p-2 w-full rounded-sm border-2 border-black"
        >
          Save task
        </button>
      </form>
    </Modal>
  );
};
