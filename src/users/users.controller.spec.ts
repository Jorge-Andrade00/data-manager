import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useClass: Repository,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('Create user', () => {
    const user = new Users();

    user.id = 1;
    user.rut = '12345678-9';
    user.name = 'John';
    user.firstSurname = 'Doe';
    user.secondSurname = 'Smith';

    it('should create a new user', async () => {
      jest.spyOn(usersService, 'create').mockResolvedValue(user);

      const response = await usersController.create({
        rut: '12345678-9',
        name: 'John',
        firstSurname: 'Doe',
        secondSurname: 'Smith',
      });

      expect(response).toBeDefined();
    });

    it('should throw an error if user creation fails', async () => {
      jest.spyOn(usersService, 'create').mockRejectedValue(new Error());

      try {
        await usersController.create({
          rut: '12345678-9',
          name: 'John',
          firstSurname: 'Doe',
          secondSurname: 'Smith',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('Find user', () => {
    const user = new Users();

    user.id = 1;
    user.rut = '12345678-9';
    user.name = 'John';
    user.firstSurname = 'Doe';
    user.secondSurname = 'Smith';

    it('should find a user', async () => {
      jest.spyOn(usersService, 'find').mockResolvedValue([user]);

      const response = await usersController.find('John');

      expect(response).toBeDefined();
    });

    it('should throw an error if user retrieval fails', async () => {
      jest.spyOn(usersService, 'find').mockRejectedValue(new Error());

      try {
        await usersController.find('John');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
