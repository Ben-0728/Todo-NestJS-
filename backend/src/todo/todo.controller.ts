import { Body, Controller, Post, HttpException, HttpStatus, Get, Param, Query, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';


@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) {}
    
    @Post('create')
    async create(@Body() createTodoDto: CreateTodoDto,@Query('userId') userId: number) {
        const todo = await this.todoService.CreateTodo(createTodoDto.title, createTodoDto.content, userId);
        return todo;
    }
    
    @Post('update')
    async update(@Body() updateTodoDto: UpdateTodoDto,@Query('userId') userId: number) {
        const todo = await this.todoService.UpdateTodoById(updateTodoDto.id, userId, updateTodoDto.title, updateTodoDto.content);
        return todo;
    }
    
    @Get('list')
    async list(@Query('userId') userId: number){
        const todos = await this.todoService.GetTodos(userId);
        return todos;
    }

    @Get('list/:id')
    async listById(@Query('userId') userId: number, @Param('id') id: number){
        const todo = await this.todoService.GetTodoById(id, userId);
        return todo;
    }

    @Post('complete')
    async complete(@Query('userId') userId: number, @Body() {id}: {id: number}){
        const todo = await this.todoService.CompleteTodo(id, userId);
        return todo;
    }
    @Post('delete')
    async delete(@Query('userId') userId: number, @Body() {id}: {id: number}){
        const todo = await this.todoService.DeleteTodoById(id, userId);
        return todo;
    }
}