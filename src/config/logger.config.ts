import { ConfigService } from '@nestjs/config';
import { Environment } from '../utils/enums/environment.enum';

const transportOptions = {
  target: 'pino-pretty',
  options: {
    levelFirst: true,
    translateTime: true,
    colorize: true,
  },
};

export const LoggerConfig = (config: ConfigService) => {
  return {
    pinoHttp: {
      level: config.get('LOG_LEVEL'),
      name: config.get('npm_package_name'),
      transport:
        config.get('NODE_ENV') !== Environment.PROD
          ? transportOptions
          : undefined,
    },
  };
};
