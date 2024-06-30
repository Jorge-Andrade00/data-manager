import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async create(createUserDto: {
    rut: string;
    name: string;
    firstSurname?: string;
    secondSurname?: string;
  }): Promise<Users> {
    return this.userRepository.save(createUserDto);
  }

  async find(input: string): Promise<Users[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.name ILIKE :input', { input: `%${input}%` })
      .orWhere('user.firstSurname ILIKE :input', { input: `%${input}%` })
      .orWhere('user.secondSurname ILIKE :input', { input: `%${input}%` })
      .orWhere('user.rut ILIKE :input', { input: `%${input}%` })
      .getMany();
  }
}
