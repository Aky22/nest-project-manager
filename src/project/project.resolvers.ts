import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Project } from './project.entity';
import { CreateProjectInput } from '../graphql.schema';
import { ProjectService } from './project.service';
import { ProjectGuard } from './project.guard';

const pubSub = new PubSub();

@Resolver('Project')
export class ProjectResolvers {
    constructor(private readonly projectService: ProjectService) {}

    @Query()
    @UseGuards(ProjectGuard)
    async getProjects() {
        return await this.projectService.findAll();
    }

    @Query('project')
    async findOneById(
        @Args('id', ParseIntPipe)
        id: number,
    ): Promise<Project> {
        return await this.projectService.findOneById(id);
    }

    @Mutation('createProject')
    async create(@Args('createProjectInput') args: CreateProjectInput): Promise<Project> {
        const createdProject = await this.projectService.create(args);
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