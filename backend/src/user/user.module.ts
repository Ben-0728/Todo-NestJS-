import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service';


@Module({
  imports: [
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
        }),
        inject: [ConfigService],
      }),
  ],
  providers: [UserService, PrismaService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
