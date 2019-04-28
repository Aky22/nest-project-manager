import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthenticationError } from 'apollo-server-errors';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  private ctx: any;

  constructor(private readonly reflector: Reflector) {
    super ();
    this.ctx = undefined;
  }

  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    this.ctx = context;

    return super.canActivate(
      new ExecutionContextHost([req]),
    );
  }

  handleRequest(err: any, user: any, info: any) {

    const roles = this.reflector.get<string[]>('roles', this.ctx.getHandler());
    if (!roles) {
      return user;
    }

    if (user) {
      if (user ['role'] != roles) {
        throw new AuthenticationError('GqlAuthGuard');
      }
    }

    if (err || !user) {
      throw err || new AuthenticationError('GqlAuthGuard');
    }
    return user;
  }
}
