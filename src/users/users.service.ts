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

  async create(usarData: {
    rut: string;
    name: string;
    firstSurname?: string;
    secondSurname?: string;
  }): Promise<Users> {
    const user = new Users();

    user.rut = usarData.rut;
    user.name = usarData.name;
    user.firstSurname = usarData.firstSurname;
    user.secondSurname = usarData.secondSurname;

    return this.userRepository.save(user);
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
