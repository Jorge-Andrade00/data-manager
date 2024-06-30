import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const PostgreConfig = (config: ConfigService): TypeOrmModule => ({
  type: 'postgres',
  host: config.get('POSTGRE_HOST'),
  port: config.get('POSTGRE_PORT'),
  username: config.get('POSTGRE_USER'),
  password: config.get('POSTGRE_PASSWORD'),
  database: config.get('POSTGRE_DB'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: config.get('NODE_ENV') === 'development' ? true : false,
});
