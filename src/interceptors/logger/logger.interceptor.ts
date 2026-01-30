// eslint-disable-next-line prettier/prettier
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  //context: ExecutionContext provide details about request,next: Callhandler we can
  // modify responce before going to client
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('request started....');
    const start = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`Reqest completed in ${Date.now() - start}ms`)),
      );
    //this is run anything after route handle we need to use this
    //it actually returns the observable which we transform to response
  }
}
