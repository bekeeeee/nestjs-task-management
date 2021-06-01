import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from "config"
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345678',
  database: 'taskmangement',

  entities: [__dirname + '/../**/*.entity{.ts,.js}'],


  synchronize: true,
};
