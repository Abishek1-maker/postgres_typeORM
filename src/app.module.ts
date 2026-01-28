import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgconfig } from 'dbConfig';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';

@Module({
  imports: [PropertyModule, TypeOrmModule.forRoot(pgconfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //from this consumer we can apply the middleware in this module
    consumer
      .apply(AuthMiddleware)
      // .exclude('/property') means except this
      .forRoutes('*'); // now it is applied for all module and
    //  API method if there is token authorization we enable
    // then only works otherthen it will be unauthorized
    // .forRoutes('/property', '/'); //it means authorization
    // only applied on http://localhost:3000/property not in http://localhost:3000
    // .forRoutes('/property', '/'); this means only authorized property andand globally /3000
    // forRoutes({ path: '/property', method: RequestMethod.GET}); only on applied in get method of property
  }
}
