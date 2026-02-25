/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshJwtConfig from './config/refresh-jwt.config';
import type { ConfigType } from '@nestjs/config';
import { CurrentUser } from './types/current-user';
import * as argon2 from 'argon2';

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

  //created new
  async login(userId: number) {
    // const payload: AuthJwtPayload = { sub: userId };

    // const token = this.JwtService.sign(payload);
    // const Refresh_token = this.JwtService.sign(
    //   payload,
    //   this.refresh_tokenConfiguration,
    // );

    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const tokens = await this.generateTokens(userId); //just for console
    console.log('Generated Tokens->', tokens); //just for console
    const hashedrefreshToken = await argon2.hash(refreshToken);
    await this.userService.updateHashedRefreshToken(userId, hashedrefreshToken);
    return {
      id: userId,
      accessToken,
      refreshToken,
    };
  }

  //Generate Token Functions
  async generateTokens(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.JwtService.signAsync(payload),
      this.JwtService.signAsync(payload, this.refresh_tokenConfiguration),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  //paste as login function It is called Refresh Token Rotation
  async refreshToken(userId: number) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedrefreshToken = await argon2.hash(refreshToken);
    await this.userService.updateHashedRefreshToken(userId, hashedrefreshToken);
    return {
      id: userId,
      accessToken,
      refreshToken,
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

  //Validating the refreshToken
  //extract the refresh token from the header of the request not in the hashed form(original)
  async validaterefreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    //taken from entity
    if (!user || !user.hashedrefreshToken)
      //if user somehow dlted ot logout from system we can return as this(we can see user logout or not)
      throw new UnauthorizedException('Invalid Refresh Token');

    const refreshTokenMatches = await argon2.verify(
      user.hashedrefreshToken, //hashed version
      refreshToken, //plain version
    );
    //checked if matches or not hashed and plain
    if (!refreshTokenMatches)
      throw new UnauthorizedException('Invalide refresh TOken');
    //if true return passed above two
    return { id: userId };
  }

  //Create Signout or Logout function
  //empty string for the hashed refresh token which mean user is logged out
  async signOut(userId: number) {
    await this.userService.updateHashedRefreshToken(userId, '');
  }
}
