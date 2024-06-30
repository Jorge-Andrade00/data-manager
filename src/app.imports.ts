import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { LoggerConfig } from './config/logger.config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgreConfig } from './config/postgre.config';

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
];
