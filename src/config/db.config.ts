import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';
import * as path from 'path';
export default (): PostgresConnectionOptions => ({
  url: process.env.url,
  type: 'postgres',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],
  synchronize: true, //development
  ssl: {
    rejectUnauthorized: false,
  },
});
