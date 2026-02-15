/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

// export making factory function
export default registerAs(
  'jwt1',
  (): JwtModuleOptions => ({
    //secret key used to create jwt token and later used to validate jwt token should be in env(think as key)
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: (process.env.JWT_EXPIRE_IN || '1d') as any,
    },
  }),
);
