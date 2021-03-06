import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription, ResolveProperty, Parent } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CreateTaskInput, Task } from '../graphql.schema';
import { TaskGuard } from './task.guard';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../project/project.entity';
import { Roles } from '../auth/roles.decorator';

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
    @Roles('admin')
    async task(
        @Args('id', ParseIntPipe)
        id: number,
    ): Promise<TaskEntity> {
        return await this.taskRepository.findOne(id);
    }

    @Mutation('createTask')
    async create(
      @Args('createTaskInput')
      args: CreateTaskInput,
    ): Promise<TaskEntity> {
        const entity = this.taskRepository.create(args);
        entity.project = this.projectRepository.findOne(args.projectID);
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
