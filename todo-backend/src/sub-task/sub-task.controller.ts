import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SubTaskService } from './sub-task.service';
import { CreateSubTaskDto } from './dto/create-subtask.dto';
import { UpdateSubTaskDto } from './dto/update-subtask.dto';

@Controller('subtasks')
export class SubTaskController {
  constructor(private subTaskService: SubTaskService) {}

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  async create(@Param('id') id: number, @Body() body: CreateSubTaskDto) {
    await this.subTaskService.create(id, body);
    return { message: 'success' };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('id') id: number, @Body() body: UpdateSubTaskDto) {
    await this.subTaskService.update(id, body);
    return { message: 'success' };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    await this.subTaskService.delete(id);
    return { message: 'success' };
  }
}
