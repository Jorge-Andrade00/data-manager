import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../src/users/entities/user.entity';
import { Address } from '../../src/addresses/entities/address.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AddressesController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<Users>;
  let addressRepository: Repository<Address>;
  let userId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'falp',
          password: 'Falp@123',
          database: 'ms_data_manager',
          entities: [Users, Address],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userRepository = moduleFixture.get<Repository<Users>>(
      getRepositoryToken(Users),
    );
    addressRepository = moduleFixture.get<Repository<Address>>(
      getRepositoryToken(Address),
    );
  });

  afterAll(async () => {
    await addressRepository.query('DELETE FROM address');
    await userRepository.query('DELETE FROM users');
    await app.close();
  });

  it('/addresses (POST) should create a new address', async () => {
    const createUserDto = {
      rut: '90590464',
      name: 'John',
      firstSurname: 'Doe',
      secondSurname: 'Smith',
    };

    const userResponse = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(201);

    userId = userResponse.body.id;

    const createAddressDto = {
      street: 'Main St',
      number: '123',
      city: 'Anytown',
      userId: userResponse.body.id,
    };

    const response = await request(app.getHttpServer())
      .post('/addresses')
      .send(createAddressDto)
      .expect(201);

    expect(response.body).toMatchObject(createAddressDto);
  });

  it('/addresses (GET) should return an array of addresses', async () => {
    const response = await request(app.getHttpServer())
      .get(`/addresses/${userId}`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(1);
  });
});
