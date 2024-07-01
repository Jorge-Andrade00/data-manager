import { Test, TestingModule } from '@nestjs/testing';
import { AddressesService } from './addresses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Users } from '../../src/users/entities/user.entity';
import { Repository } from 'typeorm';

describe('AddressesService', () => {
  let service: AddressesService;
  let addressRepository: Repository<Address>;
  let userRepository: Repository<Users>;

  const mockAddressRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  const mockUserRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressesService,
        {
          provide: getRepositoryToken(Address),
          useValue: mockAddressRepository,
        },
        {
          provide: getRepositoryToken(Users),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<AddressesService>(AddressesService);
    addressRepository = module.get<Repository<Address>>(
      getRepositoryToken(Address),
    );
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

    const address = new Address();
    address.street = '123 Main St';
    address.number = '123';
    address.city = 'Springfield';
    address.user = user;

    it('should create an address', async () => {
      mockAddressRepository.save.mockReturnValue(Promise.resolve(address));

      const createdAddress = await service.create(address);
      expect(createdAddress).toEqual(address);
    });

    it('should throw an error if save throws an error', async () => {
      mockAddressRepository.save.mockRejectedValue(new Error());

      await expect(service.create(address)).rejects.toThrowError();
    });
  });

  describe('Find user addresses', () => {
    const user = new Users();
    user.rut = '12345678-9';
    user.name = 'John';
    user.firstSurname = 'Doe';
    user.secondSurname = 'Smith';

    const address = new Address();
    address.street = '123 Main St';
    address.number = '123';
    address.city = 'Springfield';
    address.user = user;

    it('should return a list of addresses', async () => {
      mockAddressRepository.find.mockReturnValue(Promise.resolve([address]));

      const addresses = await service.findUserAddresses(user.id);
      expect(addresses).toEqual([address]);
    });

    it('should throw an error if find throws an error', async () => {
      mockAddressRepository.find.mockRejectedValue(new Error());

      await expect(service.findUserAddresses(user.id)).rejects.toThrowError();
    });
  });
});
