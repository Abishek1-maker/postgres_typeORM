import type { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthJwtPayload } from '../types/auth-jwtPayload';
import { Inject, Injectable } from '@nestjs/common';
import refreshJwtConfig from '../config/refresh-jwt.config';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class refreshStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private refreshjwtConfiguration: ConfigType<typeof refreshJwtConfig>,
    private authservice: AuthService,
  ) {
    if (!refreshjwtConfiguration.secret) {
      throw new Error('JWT secret is not defined in configuration!');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      secretOrKey: refreshjwtConfiguration.secret as string,
      ignoreExpiration: false,
      //now we can access the validate function
      passReqToCallback: true,
    });
  }
  //When we expect refresh token as bearer token it came from  request header in a field called authorixation
  // and it values start with bearer string then after the bearer the client puts its acess token came something like this:
  // authorization: Bearer ewoiuwfhi3muji4o53444; thats why we expect here from auth header as bearer token
  //Request came from express
  validate(req: Request, payload: AuthJwtPayload) {
    //extract ur refreshtk from header of request.
    const refreshToken = req
      .get('authorization')
      ?.replace('Bearer ', '')
      .trim();

    //match the refresh token with its hash version in user table (extract user id from payload)
    const userId = payload.sub;

    if (!refreshToken) {
      throw new Error('Refresh token is missing');
    }

    //if it is valid return the an object contain ID of the user  then we know that returning
    // object will append in req.object(req.user)

    return this.authservice.validaterefreshToken(userId, refreshToken);
  }
}
