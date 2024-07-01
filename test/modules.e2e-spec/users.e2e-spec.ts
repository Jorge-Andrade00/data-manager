import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Address } from '../../src/addresses/entities/address.entity';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<Users>;
  let addressRepository: Repository<Address>;
  let userRut: string;

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

  it('/users (POST) validation rut error', async () => {
    const createUserDto = {
      rut: '123456789',
      name: 'John',
      firstSurname: 'Doe',
      secondSurname: 'Smith',
    };

    await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(400);
  });

  it('/users (POST) should create a new user', async () => {
    const createUserDto = {
      rut: '203335733',
      name: 'John',
      firstSurname: 'Doe',
      secondSurname: 'Smith',
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(201);

    userRut = response.body.rut;

    expect(response.body).toMatchObject(createUserDto);
  });

  it('/users (GET) should return an array of users', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/${userRut}`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(1);
  });
});
