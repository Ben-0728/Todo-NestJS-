import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findUserByEmail(createUserDto.email);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userService.createUser(createUserDto.email, createUserDto.password, createUserDto.name);
    return user;
  }

  @Post('signin')
  async signin(@Body() SigninUserDto: SigninUserDto) {
    const user = await this.userService.findUser(SigninUserDto.email, SigninUserDto.password);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
