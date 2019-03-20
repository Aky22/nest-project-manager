import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskInput } from '../graphql.schema';
import { TaskEntity } from './task.entity';
import { ProjectService } from '../project/project.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    @Inject(ProjectService)
    private readonly projectService: ProjectService,
  ) {}

  async findOneById(id: number): Promise<TaskEntity> {
    return await this.taskRepository.findOne(id, {relations: ['project']});
  }

  async findAll(): Promise<TaskEntity[]> {
    return await this.taskRepository.find({relations: ['project']});
  }

  async create(task: CreateTaskInput) {
      const project = await this.projectService.findOneById(task.projectID);
      const taskEntity = new TaskEntity();
      taskEntity.name = task.name;
      taskEntity.description = task.description;
      taskEntity.project = project;
      const entity = this.taskRepository.create(taskEntity);
      return await this.taskRepository.save(entity);
  }
}
