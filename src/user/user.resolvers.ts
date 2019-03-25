import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription, ResolveProperty, Parent } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CreateUserInput } from '../graphql.schema';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserGuard } from './user.guard';
const pubSub = new PubSub();

@Resolver('User')
export class UserResolvers {
  private crypto = require('crypto');
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>) {
  }

  @Query()
  @UseGuards(UserGuard)
  async getUsers() {
    return await this.userRepository.find();
  }

  @Query()
  async user(
    @Args('id', ParseIntPipe)
      id: number,
  ): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }

  @Mutation('createUser')
  async create(@Args('createUserInput') args: CreateUserInput): Promise<UserEntity> {
    args.password = this.crypto.createHmac('sha512', args.password).digest('hex');
    const entity = this.userRepository.create(args);
    const createdProject = await this.userRepository.save(entity);
    pubSub.publish('projectCreated', { projectCreated: createdProject });
    return createdProject;
  }

  @Subscription('userCreated')
  userCreated() {
    return {
      subscribe: () => pubSub.asyncIterator('userCreated'),
    };
  }

}
