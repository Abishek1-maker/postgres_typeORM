import type { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthJwtPayload } from '../types/auth-jwtPayload';
import { Inject, Injectable } from '@nestjs/common';
import refreshJwtConfig from '../config/refresh-jwt.config';

@Injectable()
//here this (refresh-jwt) name should be same in as  guards under "AuthGuard"
export class refreshStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private refreshjwtConfiguration: ConfigType<typeof refreshJwtConfig>,
  ) {
    if (!refreshjwtConfiguration.secret) {
      throw new Error('JWT secret is not defined in configuration!');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      secretOrKey: refreshjwtConfiguration.secret as string,
      ignoreExpiration: false,
    });
  }
  validate(payload: AuthJwtPayload) {
    return { id: payload.sub };
  }
}
