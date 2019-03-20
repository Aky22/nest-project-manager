import { forwardRef, Inject, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Project } from '../graphql.schema';
import { CreateProjectInput } from '../graphql.schema';
import { ProjectService } from './project.service';
import { ProjectGuard } from './project.guard';
import { TaskService } from '../task/task.service';
import { ProjectEntity } from './project.entity';
import { TaskEntity } from '../task/task.entity';

const pubSub = new PubSub();

@Resolver('Project')
export class ProjectResolvers {
  constructor(
    private readonly projectService: ProjectService,
    @Inject(forwardRef(() => TaskService))
    private readonly taskService: TaskService) {
  }

  @Query()
  @UseGuards(ProjectGuard)
  async getProjects() {
    const projects = await this.projectService.findAll();
    const projRet: Project[] = [];
    for (const entity of projects) {
      const task = await this.taskService.findAllByProject(entity.id);
      projRet.push(ProjectResolvers.taskCount(entity, task));
    }
    return projRet;
  }

  @Query('project')
  async findOneById(
    @Args('id', ParseIntPipe)
      id: number,
  ): Promise<Project> {
    const project = await this.projectService.findOneById(id);
    const tasks = await this.taskService.findAllByProject(project.id);
    return ProjectResolvers.taskCount(project, tasks);
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

  static taskCount(project: ProjectEntity, tasks: TaskEntity[]): Project {
    const projRet = new Project();
    projRet.id = project.id;
    projRet.name = project.name;
    projRet.description = project.description;
    projRet.tasks = project.tasks;
    projRet.taskCount = tasks.length;
    return projRet;
  }

}
