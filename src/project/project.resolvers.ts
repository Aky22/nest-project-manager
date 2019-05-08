import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription, ResolveProperty, Parent } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/interfaces/jwt-auth.guard';

const pubSub = new PubSub();

@Resolver('Project')
@UseGuards(JwtAuthGuard)
@Roles('admin')
export class ProjectResolvers {

}
