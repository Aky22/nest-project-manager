import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription, ResolveProperty, Parent, Info } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UserGuard } from './user.guard';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../prisma/prisma.binding';

const pubSub = new PubSub();

@Resolver('User')
export class UserResolvers {
  private crypto = require('crypto');

  constructor(
    private readonly prisma: PrismaService) {
  }

  @Query('users')
  async getUsers(@Args() args, @Info() info): Promise<User[]> {
    return await this.prisma.query.users(args, info);
  }

  @Mutation('createUser')
  async createPost(@Args() args, @Info() info): Promise<User> {
    args.data.password = this.crypto.createHmac('sha256', args.data.password).digest('hex');
    return await this.prisma.mutation.createUser(args, info);
  }

  /*@Query()
  @UseGuards(UserGuard)
  async getUsers() {
    return await this.userRepository.find();
  }*/

  /*@Query()
  async user(
    @Args('id', ParseIntPipe)
      id: number,
  ): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }

  @Query()
  async login(
    @Args('username')
      username: string,
    @Args('password')
      password: string,
  ): Promise<any> {
      return await this.authService.login(username, password);
  }

  @Mutation('createUser')
  async create(@Args('createUserInput') args: CreateUserInput): Promise<UserEntity> {
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
  }*/

}
