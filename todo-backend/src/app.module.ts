import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SubTaskModule } from './sub-task/sub-task.module';
import { SubTask } from './sub-task/models/subtask.model';
import { Task } from './task/models/task.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [SubTask, Task],
      autoLoadModels: true,
    }),
    SubTaskModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
