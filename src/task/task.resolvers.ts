import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription, ResolveProperty, Parent } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CreateTaskInput, Task } from '../graphql.schema';
import { TaskGuard } from './task.guard';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../project/project.entity';

const pubSub = new PubSub();

@Resolver('Task')
export class TaskResolvers {
    constructor(
      @InjectRepository(TaskEntity)
      private readonly taskRepository: Repository<TaskEntity>,
      @InjectRepository(ProjectEntity)
      private readonly projectRepository: Repository<ProjectEntity>) {}

    @Query()
    @UseGuards(TaskGuard)
    async getTasks() {
        return await this.taskRepository.find();
    }

    @Query()
    async task(
        @Args('id', ParseIntPipe)
        id: number,
    ): Promise<TaskEntity> {
        return await this.taskRepository.findOne(id);
    }

    @ResolveProperty('project')
    async getProject(@Parent() task) {
        const { id } = task;
        return (await this.taskRepository.findOne(id, {relations: ['project']})).project;
    }

    @Mutation('createTask')
    async create(
      @Args('createTaskInput')
      args: CreateTaskInput,
    ): Promise<TaskEntity> {
        const entity = this.taskRepository.create(args);
        entity.project = await this.projectRepository.findOne(args.projectID);
        const createdTask = await this.taskRepository.save(entity);
        pubSub.publish('taskCreated', { taskCreated: createdTask });
        return createdTask;
    }

    @Subscription('taskCreated')
    taskCreated() {
        return {
        subscribe: () => pubSub.asyncIterator('taskCreated'),
        };
    }

}
