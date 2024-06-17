import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { Todo } from '@prisma/client';

type Todos = Todo[];

@Injectable()
export class TodoService {
    constructor(private prisma: PrismaService,
    private jwtService: JwtService,
    ) {}
    async CreateTodo(title: string, content: string, userId: number): Promise<number> {
        const todo = await this.prisma.todo.create({
            data: {
                title,
                content,
                userId,
            },
        });
        return todo.id;
    }

    async GetTodos(userId: number): Promise<Todos> {
        return this.prisma.todo.findMany({ where: { userId } });

    }

    async GetTodoById(id: number, userId: number): Promise<Todo | null> {
        return this.prisma.todo.findUnique({ where: { id, userId } });
    }

    async UpdateTodoById(id: number, userId: number, title: string, content: string): Promise<Todo | null> {
        return this.prisma.todo.update({ where: { id, userId }, data: { title, content } });
    }
    async CompleteTodo(id: number, userId: number): Promise<Todo | null> {
        return this.prisma.todo.update({ where: { id, userId }, data: { completed: true } });
    }
    async DeleteTodoById(id: number, userId: number): Promise<Todo | null> {
        return this.prisma.todo.delete({ where: { id, userId } });
    }
}