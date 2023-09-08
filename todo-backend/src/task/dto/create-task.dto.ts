import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from 'src/enums/status';
import { SubTask } from 'src/sub-task/models/subtask.model';

export class CreateTaskDto {
  @IsString()
  @ApiProperty()
  content: string;

  @IsEnum(Status)
  @ApiProperty({ enum: Status })
  status: Status;

  @IsOptional()
  @ApiProperty()
  subtasks: SubTask[];
}
