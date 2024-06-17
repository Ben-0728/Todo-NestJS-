import { Module, NestModule } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoMiddleware } from './todo.middleware';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';
import { PrismaService } from '../prisma.service';

@Module({
    imports: [JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
        }),
        inject: [ConfigService],
      }),],
    controllers: [TodoController],
    providers: [TodoService, PrismaService],
})

export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TodoMiddleware)
      .forRoutes(TodoController);
  }
}