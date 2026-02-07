import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';
import * as path from 'path';
import { registerAs } from '@nestjs/config';
export default registerAs(
  //by registerAs way we can get individual data of db
  'dbconfig.dev',
  (): PostgresConnectionOptions => ({
    url: process.env.url,
    type: 'postgres',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],
    synchronize: false, //production
    ssl: {
      rejectUnauthorized: false,
    },
  }),
);
