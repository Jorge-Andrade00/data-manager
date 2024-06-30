import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './entities/address.entity';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    return this.addressesService.create(createAddressDto);
  }

  @Get(':userId')
  findUserAddresses(@Param('userId') userId: number) {
    return this.addressesService.findUserAddresses(userId);
  }
}
