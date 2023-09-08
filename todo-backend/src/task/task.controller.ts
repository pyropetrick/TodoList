import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Task } from './models/task.model';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @ApiResponse({ status: 200, type: Task, isArray: true })
  @HttpCode(HttpStatus.OK)
  async get() {
    return await this.taskService.getAll();
  }

  @Post()
  @ApiBody({ type: CreateTaskDto, required: true })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateTaskDto) {
    await this.taskService.create(body);
    return { message: 'success' };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('id') id: number, @Body() body: UpdateTaskDto) {
    await this.taskService.update(id, body);
    return { message: 'success' };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    await this.taskService.delete(+id);
    return { message: 'success' };
  }
}
