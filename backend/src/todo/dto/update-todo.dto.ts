import { IsNotEmpty } from 'class-validator';

export class UpdateTodoDto {

  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}
