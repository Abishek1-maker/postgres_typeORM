/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const auth = req.headers['authorization'];
    //if you are taking auto aurization from token
    if (!auth) throw new UnauthorizedException('Authorization is missing 401');

    return true;

    //#####if you are giving authorization through header custom
    // if (auth != 'abcd')
    //   throw new UnauthorizedException('Authorization wrong or missing');

    // return auth === 'abcd';
  }
}
