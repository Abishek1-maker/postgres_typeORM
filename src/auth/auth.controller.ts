/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @HttpCode(200)
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local')) //AuthGuard came from passport
  // and local is name of strategy , you can use custom guard also
  @Post('login')
  async login(@Request() req: any) {
    console.log(req.hehe, req.user);
    return await req.user; //but passport Always uses lowercase 'user as the property name  req.user
    // we can know from the local startegy return'
  }
}
