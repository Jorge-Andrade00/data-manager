import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/user.entity';
import { ValidateRutPipe } from '../utils/pipes/validateRutPipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body(new ValidateRutPipe()) createUserDto: CreateUserDto,
  ): Promise<Users> {
    return this.usersService.create(createUserDto);
  }

  @Get(':input')
  find(@Param('input') input: string) {
    return this.usersService.find(input);
  }
}
