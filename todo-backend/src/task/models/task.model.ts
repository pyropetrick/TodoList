import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { SubTask } from 'src/sub-task/models/subtask.model';
import hooks from '../../../node_modules/moment/dist/moment';

@Table({ tableName: 'tasks' })
export class Task extends Model<Task> {
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

  @HasMany(() => SubTask, { onDelete: 'cascade', hooks: true })
  subTasks: SubTask[];
}
