import { Module, forwardRef } from '@nestjs/common';
import { SubTaskService } from './sub-task.service';
import { SubTaskController } from './sub-task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubTask } from './models/subtask.model';
import { TaskModule } from 'src/task/task.module';

@Module({
  providers: [SubTaskService],
  controllers: [SubTaskController],
  imports: [
    SequelizeModule.forFeature([SubTask]),
    forwardRef(() => TaskModule),
  ],
  exports: [SubTaskService],
})
export class SubTaskModule {}
