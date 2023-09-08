import { useEffect } from "react";
import {
  CreateTaskForm,
  EmptyList,
  Loading,
  TaskList,
  Toast,
} from "./components";
import { useTasks } from "./hooks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  const { data, isLoading, isError } = useTasks();

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong! Sorry , reload page");
    }
  }, [isError]);

  return (
    <div className="h-max container mx-auto p-4">
      <h1 className="text-center text-xl font-semibold">Todo List</h1>
      <CreateTaskForm />
      {!isLoading && data && data.length > 0 ? (
        <TaskList tasks={data} />
      ) : (
        <EmptyList />
      )}
      {isLoading && <Loading />}
      <Toast />
    </div>
  );
};
