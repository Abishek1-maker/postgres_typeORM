import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
//here this (refresh-jwt) name should be in strategy refresh strategy name also
export class RefreshAuthGuard extends AuthGuard('refresh-jwt') {}
