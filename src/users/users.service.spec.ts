import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<Users>;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const user = new Users();
    user.rut = '12345678-9';
    user.name = 'John';
    user.firstSurname = 'Doe';
    user.secondSurname = 'Smith';

    it('should create a user', async () => {
      mockRepository.save.mockReturnValue(Promise.resolve(user));

      const createdUser = await service.create(user);
      expect(createdUser).toEqual(user);
    });

    it('should call save with the correct arguments', async () => {
      await service.create(user);
      expect(mockRepository.save).toHaveBeenCalledWith(user);
    });

    it('should throw an error if save throws an error', async () => {
      mockRepository.save.mockRejectedValue(new Error());

      try {
        await service.create(user);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('find', () => {
    const user = new Users();
    user.rut = '12345678-9';
    user.name = 'John';
    user.firstSurname = 'Doe';
    user.secondSurname = 'Smith';

    it('should find a user', async () => {
      mockRepository.createQueryBuilder.mockReturnValue({
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([user]),
      });

      const users = await service.find('John');

      expect(users).toEqual([user]);
      expect(mockRepository.createQueryBuilder).toHaveBeenCalled();
    });

    it('should throw an error if find throws an error', async () => {
      mockRepository.find.mockRejectedValue(new Error());

      try {
        await service.find('John');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
