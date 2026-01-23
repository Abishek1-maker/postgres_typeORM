import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

export const pgconfig: PostgresConnectionOptions = {
  url: 'postgresql://neondb_owner:npg_yWUlQqSFZ1G2@ep-billowing-paper-ah5rio7d-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  type: 'postgres',
  port: 5432,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  //Automatically update based on schema of our database
  //set false in production level and true in development
  synchronize: true,
};
