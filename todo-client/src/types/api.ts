import { Task } from ".";

export type CreateTaskBody = {
  subtasks?: Task[];
} & Task;

export type UpdateTask = {
  id: number;
} & Partial<Task>;

export type CommonTask = {
  id: number;
  createdAt: string;
  updatedAt: string;
} & Task;

export type MainTask = {
  subTasks: CommonTask[];
} & CommonTask;
