import {
  AddIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EditIcon,
  TrashIcon,
} from "@/assets";
import { MainTask, Task as TaskType } from "@/types";
import { STATUS } from "@/utils";
import { FC, memo, useCallback } from "react";
import { SubTask } from "./SubTask";
import {
  useCreateSubTask,
  useDeleteTask,
  useToggle,
  useUpdateTask,
} from "@/hooks";
import { CreateModal, EditModal } from "..";

type Props = MainTask;

export const Task: FC<Props> = memo(({ id, subTasks, status, content }) => {
  const [isDescriptionOpen, toggleDescription] = useToggle();
  const [addModal, toggleAddModal] = useToggle();
  const [editModal, toggleEditModal] = useToggle();
  const mutationDelete = useDeleteTask();
  const mutationCreate = useCreateSubTask();
  const mutationUpdate = useUpdateTask();

  const handleDeleteTask = useCallback(() => {
    mutationDelete.mutate(id.toString());
  }, [id, mutationDelete]);

  const onSaveSubtask = (data: TaskType) => {
    mutationCreate.mutate({ id: id.toString(), ...data });
  };

  const onSaveEditedTask = (data: TaskType) => {
    mutationUpdate.mutate({ id, ...data });
  };
  return (
    <div className="w-full p-4 rounded-md shadow-md flex flex-col gap-5">
      <div className="flex justify-between">
        <h3
          className={`font-semibold text-lg ${
            status === STATUS.COMPLETED && "line-through"
          }`}
        >
          {content}
        </h3>
        <div className="flex gap-2 items-center">
          {isDescriptionOpen ? (
            <ChevronUpIcon
              className="cursor-pointer"
              onClick={toggleDescription}
            />
          ) : (
            <ChevronDownIcon
              className="cursor-pointer"
              onClick={toggleDescription}
            />
          )}
          <AddIcon className="cursor-pointer" onClick={toggleAddModal} />
          <EditIcon className="cursor-pointer" onClick={toggleEditModal} />
          <TrashIcon className="cursor-pointer" onClick={handleDeleteTask} />
        </div>
      </div>
      {isDescriptionOpen && subTasks.length > 0 && (
        <ul className="flex flex-col gap-3">
          {subTasks.map((subtask) => (
            <SubTask key={subtask.id} {...subtask} />
          ))}
        </ul>
      )}
      {editModal && (
        <EditModal
          isVisible={editModal}
          hideModal={toggleEditModal}
          saveTask={onSaveEditedTask}
          defaultValues={{ status, content }}
        />
      )}

      {addModal && (
        <CreateModal
          isVisible={addModal}
          hideModal={toggleAddModal}
          saveTask={onSaveSubtask}
        />
      )}
    </div>
  );
});
