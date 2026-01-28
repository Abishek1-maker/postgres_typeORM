import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']; //take the token from authorization key from header
    if (!token) return res.status(403).json({ message: 'unauthorized' });

    //Check the JWT token TODO

    console.log(`User authenticated with token: ${token}`);

    next(); // function nextwhich pass the control to middleware or next route
    // handle if there are not middleware in list
  }
}
