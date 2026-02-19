/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export default registerAs(
  'refresh_jwt',
  (): JwtSignOptions => ({
    secret: process.env.Refresh_JWT_SECRET,
    expiresIn: (process.env.Refresh_JWT_EXPIRE_IN || '1d') as any,
  }),
);
