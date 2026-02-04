import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private cache = new Map();
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const req = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const key = req.url;
    if (this.cache.has(key)) {
      console.log('Returning cached response.');
      return new Observable((observer) => {
        observer.next(this.cache.get(key));
        observer.complete();
      });
    }
    return next.handle().pipe(
      map((response) => {
        this.cache.set(key, response);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return response;
      }),
    );
  }
}
