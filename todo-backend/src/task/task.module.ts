import { Module, forwardRef } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './models/task.model';
import { SubTaskModule } from 'src/sub-task/sub-task.module';

@Module({
  providers: [TaskService],
  controllers: [TaskController],
  imports: [
    SequelizeModule.forFeature([Task]),
    forwardRef(() => SubTaskModule),
  ],
  exports: [TaskService],
})
export class TaskModule {}
