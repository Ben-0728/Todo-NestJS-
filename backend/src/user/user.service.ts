import { Injectable } from '@nestjs/common';
// import { User1 } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';

type User1 = {
    id: number;
    name: string;
    email: string;
    password: string;
}


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService,
    private jwtService: JwtService,
    ) {}


  async createUser(email: string, password: string, name: string): Promise<string> {
    const user = await this.prisma.user1.create({
      data: {
        name,
        email,
        password,
      },
    });
    const token = await this.jwtService.signAsync({ sub: user.id });
    return token;
  }

  async findUser(email: string, password: string): Promise<string> {
    const user = await this.prisma.user1.findUnique({ where: { email, password } });
  
  if(!user){
    return "";
  }
  const token = await this.jwtService.signAsync({ sub: user.id });
    return token;
}

    async findUserByEmail(email: string): Promise<User1 | null> {
        return this.prisma.user1.findUnique({ where: { email } });
    }
}
