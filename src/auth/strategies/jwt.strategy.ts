/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from '../config/jwt.config';
import { AuthJwtPayload } from '../types/auth-jwtPayload';
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
    private Authservice: AuthService,
  ) {
    if (!jwtConfiguration.secret) {
      throw new Error('JWT secret is not defined in configuration!');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      secretOrKey: jwtConfiguration.secret as string,
      ignoreExpiration: false,
    });
  }

  //Roles BASED=> (ValidateJWTUser) came from auth services this function for adding role property into the user
  // object we going to append to req object from this validate function in jwt strategies
  validate(payload: AuthJwtPayload) {
    const userId = payload.sub;
    return this.Authservice.ValidateJWTUser(userId);
  }
}
