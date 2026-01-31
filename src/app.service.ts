import { Injectable } from '@nestjs/common';
import { map, of, tap } from 'rxjs';

@Injectable()
export class AppService {
  getHello(): string {
    of(1, 2, 3)
      .pipe(
        tap((value) => console.log(`Before${value}`)),
        map((value) => value + 10),
        tap((value) => console.log(`After using map value is::${value}`)),
      )
      .subscribe();
    return 'Hello World!';
  }
}
