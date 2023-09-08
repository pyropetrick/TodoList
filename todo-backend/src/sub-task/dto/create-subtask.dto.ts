import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Status } from 'src/enums/status';

export class CreateSubTaskDto {
  @IsString()
  @ApiProperty()
  content: string;

  @IsEnum(Status)
  @ApiProperty({ enum: Status })
  status: Status;
}
