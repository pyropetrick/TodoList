import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './models/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { SubTask } from 'src/sub-task/models/subtask.model';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SubTaskService } from 'src/sub-task/sub-task.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task) private taskRepository: typeof Task,
    @Inject(forwardRef(() => SubTaskService))
    private subTaskService: SubTaskService,
  ) {}

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findByPk(id);

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async getAll(): Promise<Task[]> {
    const todos = await this.taskRepository.findAll({
      include: {
        model: SubTask,
        as: 'subTasks',
      },
    });
    return todos;
  }

  async create(dto: CreateTaskDto): Promise<void> {
    const task = await this.taskRepository.create({
      content: dto.content,
      status: dto.status,
    });
    if (dto.subtasks) {
      await this.subTaskService.createMany(dto.subtasks, task.id);
    }
  }

  async update(id: number, dto: UpdateTaskDto) {
    const task = await this.findOne(id);

    await task.update({ ...dto });
  }

  async delete(id: number): Promise<void> {
    const task = await this.findOne(id);

    await task.destroy();
  }
}
