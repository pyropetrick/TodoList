import { EditIcon, XIcon } from "@/assets";
import { useDeleteSubTask, useToggle, useUpdateSubTask } from "@/hooks";
import { CommonTask, Task } from "@/types";
import { STATUS } from "@/utils";
import { FC, memo } from "react";
import { EditModal } from "..";

type Props = CommonTask;

export const SubTask: FC<Props> = memo(({ status, id, content }) => {
  const [editModal, toggleEditModal] = useToggle();
  const deleteMutation = useDeleteSubTask();
  const updateMutation = useUpdateSubTask();

  const onSaveEditTask = (data: Task) => {
    updateMutation.mutate({ id, ...data });
  };

  const handleDelete = () => {
    deleteMutation.mutate(id.toString());
  };

  return (
    <li
      className={`p-2 border-2 rounded-sm font-medium text-md flex justify-between ${
        status === STATUS.COMPLETED && "line-through"
      }`}
      key={id}
    >
      {content}
      <div className="flex gap-2">
        <EditIcon className="cursor-pointer" onClick={toggleEditModal} />
        <XIcon className="cursor-pointer" onClick={handleDelete} />
      </div>
      {editModal && (
        <EditModal
          isVisible={editModal}
          hideModal={toggleEditModal}
          saveTask={onSaveEditTask}
          defaultValues={{ status, content }}
        />
      )}
    </li>
  );
});
