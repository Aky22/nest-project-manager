import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription, ResolveProperty, Parent } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { TaskGuard } from './task.guard';
import { Roles } from '../auth/roles.decorator';

const pubSub = new PubSub();

@Resolver('Task')
export class TaskResolvers {

}
