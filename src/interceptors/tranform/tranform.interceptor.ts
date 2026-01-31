import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TranformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return next.handle().pipe(map((datas) => ({ message: true, datas })));
    //We use map because we want to CHANGE the response.
    //tap is only for side effects and does NOT modify data.
  }
}
