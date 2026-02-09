import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class Localstrategy extends PassportStrategy(Strategy) {
  constructor(private authservice: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  validate(email: string, password: string) {
    return this.authservice.validateUser(email, password); //validateUser came from authservice
  }
}
