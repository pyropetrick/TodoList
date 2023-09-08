import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SubTask } from './models/subtask.model';
import { CreateSubTaskDto } from './dto/create-subtask.dto';
import { UpdateSubTaskDto } from './dto/update-subtask.dto';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class SubTaskService {
  constructor(
    @InjectModel(SubTask)
    private subTaskRepository: typeof SubTask,
    @Inject(forwardRef(() => TaskService))
    private taskService: TaskService,
  ) {}

  async createMany(subTasks: SubTask[], id: number) {
    await this.subTaskRepository.bulkCreate(
      subTasks.map(({ content, status }) => ({
        content,
        status,
        taskId: id,
      })),
    );
  }

  async findOne(id: number) {
    const subTask = await this.subTaskRepository.findByPk(id);

    if (!subTask) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return subTask;
  }

  async create(id: number, dto: CreateSubTaskDto) {
    const task = await this.taskService.findOne(id);
    await this.subTaskRepository.create({
      ...dto,
      taskId: task.id,
      task: task,
    });
  }

  async update(id: number, dto: UpdateSubTaskDto) {
    const subTask = await this.findOne(id);

    await subTask.update({ ...dto });
  }

  async delete(id: number) {
    const subTask = await this.findOne(id);

    subTask.destroy();
  }
}
