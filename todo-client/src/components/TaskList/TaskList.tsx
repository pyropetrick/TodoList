import { MainTask } from "@/types";
import { FC } from "react";
import { Task } from "..";

type Props = {
  tasks: MainTask[];
};

export const TaskList: FC<Props> = ({ tasks }) => (
  <ul className="flex flex-col gap-3 mt-10">
    {tasks.map((item) => (
      <Task key={item.id} {...item} />
    ))}
  </ul>
);
