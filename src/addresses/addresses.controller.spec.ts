import { Test, TestingModule } from '@nestjs/testing';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Users } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

describe('AddressesController', () => {
  let addressController: AddressesController;
  let addressesService: AddressesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressesController],
      providers: [
        AddressesService,
        {
          provide: getRepositoryToken(Address),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Users),
          useClass: Repository,
        },
      ],
    }).compile();

    addressController = module.get<AddressesController>(AddressesController);
    addressesService = module.get<AddressesService>(AddressesService);
  });

  it('should be defined', () => {
    expect(addressController).toBeDefined();
    expect(addressesService).toBeDefined();
  });

  describe('Create address', () => {
    const address = new Address();

    address.id = 1;
    address.city = 'New York';
    address.number = '123';
    address.street = 'Main St';
    address.userId = 1;

    it('should create a new address', async () => {
      jest.spyOn(addressesService, 'create').mockResolvedValue(address);

      const response = await addressController.create({
        city: 'New York',
        number: '123',
        street: 'Main St',
        userId: 1,
      });

      expect(response).toBeDefined();
    });

    it('should throw an error if address creation fails', async () => {
      jest.spyOn(addressesService, 'create').mockRejectedValue(new Error());

      try {
        await addressController.create({
          city: 'New York',
          number: '123',
          street: 'Main St',
          userId: 1,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('Find User Addresses', () => {
    it('should find addresses for a user', async () => {
      const addresses = [new Address()];
      jest
        .spyOn(addressesService, 'findUserAddresses')
        .mockResolvedValue(addresses);

      const response = await addressController.findUserAddresses(1);

      expect(response).toBeDefined();
    });

    it('should throw an error if address retrieval fails', async () => {
      jest
        .spyOn(addressesService, 'findUserAddresses')
        .mockRejectedValue(new Error());

      try {
        await addressController.findUserAddresses(1);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
