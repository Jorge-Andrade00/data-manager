import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { LoggerConfig } from './config/logger.config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgreConfig } from './config/postgre.config';

import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';

export const AppImports = [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  LoggerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => LoggerConfig(config),
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => PostgreConfig(config),
  }),

  //App modules
  UsersModule,
  AddressesModule,
];
