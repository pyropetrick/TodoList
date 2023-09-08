import { CreateTaskBody, MainTask, Task } from "@/types";
import axios, { AxiosInstance, AxiosResponse } from "axios";

class TaskAPI {
  private readonly url: string = import.meta.env.VITE_BACKEND_API + "tasks/";
  private readonly API: AxiosInstance = axios.create({
    baseURL: this.url,
  });

  async getAll() {
    return await this.API.get<MainTask[]>("");
  }

  async create(body: CreateTaskBody) {
    return await this.API.post<string, AxiosResponse<string>, CreateTaskBody>(
      "",
      body
    );
  }

  async update(id: string, task: Partial<Task>) {
    return await this.API.patch<string>(id, task);
  }

  async delete(id: string) {
    return await this.API.delete<string>(id);
  }
}

export default new TaskAPI();
