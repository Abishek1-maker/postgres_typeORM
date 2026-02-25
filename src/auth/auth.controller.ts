/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @HttpCode(200)
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req: any) {
    console.log(req.hehe, req.user);
    return this.authService.login(req.user.id); //token also requested
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshtoken(@Req() req: any) {
    return this.authService.refreshToken(req.user.id);
  }

  //Route for sign out post endpoint
  @Post('signout') //we cannot acces id withour this
  @UseGuards(JwtAuthGuard) //user must have valid access token then decode then extract
  async signOut(@Req() req) {
    //under user property we request so we acces user id
    await this.authService.signOut(req.user.id);
    return {
      message: 'Log out successfully',
    };
  }
}
