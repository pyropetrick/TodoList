import { Task } from "@/types";
import axios, { AxiosInstance } from "axios";

class SubTaskAPI {
  private readonly url: string = import.meta.env.VITE_BACKEND_API + "subtasks/";
  private readonly API: AxiosInstance = axios.create({
    baseURL: this.url,
  });

  async create(id: string, body: Task) {
    return await this.API.post(id, body);
  }

  async update(id: string, task: Partial<Task>) {
    return await this.API.patch(id, task);
  }

  async delete(id: string) {
    return await this.API.delete(id);
  }
}

export default new SubTaskAPI();
