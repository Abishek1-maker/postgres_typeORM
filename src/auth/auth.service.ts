/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshJwtConfig from './config/refresh-jwt.config';
import type { ConfigType } from '@nestjs/config';
import { CurrentUser } from './types/current-user';

//This is for validate user
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private JwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private readonly refresh_tokenConfiguration: ConfigType<
      typeof refreshJwtConfig
    >,
  ) {}

  async validateUser(email: string, password: string) {
    const User = await this.userService.findByEmail(email);
    if (!User) throw new UnauthorizedException('User not Found');

    const IspasswordMatch = await compare(password, User.password); //this came from entity hashpass

    if (!IspasswordMatch)
      throw new UnauthorizedException('Invalid credintials');

    return { id: User.id };
  }

  //Creating jwt token with our jwt module in user is

  login(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };

    const token = this.JwtService.sign(payload);
    const Refresh_token = this.JwtService.sign(
      payload,
      this.refresh_tokenConfiguration,
    );

    return {
      id: userId,
      token,
      Refresh_token,
    };
  }

  refreshToken(UserId: number) {
    const refresh_Payload: AuthJwtPayload = { sub: UserId };

    const refresh_token = this.JwtService.sign(refresh_Payload);
    return {
      id: UserId,
      refresh_token,
    };
  }

  //Role based here
  async ValidateJWTUser(UserId: number) {
    const user = await this.userService.findOne(UserId);
    console.log(user);
    if (!user) throw new UnauthorizedException('User not found!');
    const currentUser: CurrentUser = { id: user.id, role: user.role };
    return currentUser;
  }
}
