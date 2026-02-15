import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';

//This is for validate user
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private JwtService: JwtService,
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

    return this.JwtService.sign(payload);
  }
}
