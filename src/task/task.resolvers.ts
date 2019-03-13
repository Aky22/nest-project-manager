import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Task } from './task.entity';
import { CreateTaskInput } from '../graphql.schema';
import { TaskService } from './task.service';
import { TaskGuard } from './task.guard';

const pubSub = new PubSub();

@Resolver('Task')
export class TaskResolvers {
    constructor(private readonly taskService: TaskService) {}

    @Query()
    @UseGuards(TaskGuard)
    async getProjects() {
        return await this.taskService.findAll();
    }

    @Query('task')
    async findOneById(
        @Args('id', ParseIntPipe)
        id: number,
    ): Promise<Task> {
        return await this.taskService.findOneById(id);
    }

    @Mutation('createTask')
    async create(@Args('createTaskInput') args: CreateTaskInput): Promise<Task> {
        const createdTask = await this.taskService.create(args);
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