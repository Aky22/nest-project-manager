import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription, ResolveProperty, Parent } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Project } from '../graphql.schema';
import { CreateProjectInput } from '../graphql.schema';
import { ProjectGuard } from './project.guard';
import { ProjectEntity } from './project.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from '../auth/roles.decorator';
import { UserEntity } from '../user/user.entity';
import { JwtAuthGuard } from '../auth/interfaces/jwt-auth.guard';

const pubSub = new PubSub();

@Resolver('Project')
@UseGuards(JwtAuthGuard)
@Roles('admin')
export class ProjectResolvers {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>) {
  }

  @Query()
  @Roles('admin')
  async getProjects() {
    return await this.projectRepository.find();
  }

  @Query()
  async project(
    @Args('projectId', ParseIntPipe)
      projectId: string,
  ): Promise<ProjectEntity> {
    return await this.projectRepository.findOne({where: {id: projectId}});
  }

  @ResolveProperty('taskCount')
  async getTaskCount(@Parent() project) {
    return (await project.tasks).length;
  }

  @ResolveProperty('tasks')
  async getTasks(@Parent() project) {
    return await project.tasks;
  }

  @ResolveProperty('users')
  async getUsers(@Parent() project) {
    return await project.users;
  }

  @Mutation('createProject')
  async create(@Args('createProjectInput') args: CreateProjectInput): Promise<ProjectEntity> {
    const entity = this.projectRepository.create(args);
    entity.users = this.userRepository.find({where: {id: In(args.userIDs)}});
    const createdProject = await this.projectRepository.save(entity);
    pubSub.publish('projectCreated', { projectCreated: createdProject });
    return createdProject;
  }

  @Subscription('projectCreated')
  projectCreated() {
    return {
      subscribe: () => pubSub.asyncIterator('projectCreated'),
    };
  }

}
