import type { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from '../config/jwt.config';
import { AuthJwtPayload } from '../types/auth-jwtPayload';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  // JWTStrategy is a child class
  //  PassportStrategy(Strategy) is the parent class in here
  //Check if the JWT IS VALID it is for protect our API with jwt
  constructor(
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {
    // to send configuration to the parent class super is used.

    if (!jwtConfiguration.secret) {
      throw new Error('JWT secret is not defined in configuration!');
    }
    super({
      //     This tells Passport:
      // Where to get JWT → from Bearer token
      // What secret to use → your JWT secret
      // So super() is sending settings to Passport.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      //gConfigModule.forFeature(jwt1Config),

      secretOrKey: jwtConfiguration.secret as string,
      ignoreExpiration: false,
      //means "do not accept expired JWT
    });
  }
  validate(payload: AuthJwtPayload) {
    return { id: payload.sub };
  }
}
