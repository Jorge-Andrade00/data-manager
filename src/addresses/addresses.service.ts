import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { Users } from '../users/entities/user.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async create(addressData: {
    street: string;
    number: string;
    city: string;
    userId: number;
  }): Promise<Address> {
    const address = new Address();

    address.street = addressData.street;
    address.number = addressData.number;
    address.city = addressData.city;
    address.user = this.userRepository.create({ id: addressData.userId });

    return this.addressRepository.save(address);
  }

  async findUserAddresses(id: number) {
    return this.addressRepository.find({ where: { user: { id } } });
  }
}
