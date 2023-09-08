import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Task } from 'src/task/models/task.model';

@Table({ tableName: 'subTasks' })
export class SubTask extends Model<SubTask> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  content: string;

  @Column({ defaultValue: 'todo', type: DataType.ENUM('todo', 'completed') })
  status: 'completed' | 'todo';

  @BelongsTo(() => Task)
  task: Task;

  @ForeignKey(() => Task)
  taskId: number;
}
