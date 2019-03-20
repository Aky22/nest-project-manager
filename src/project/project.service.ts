import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectInput} from '../graphql.schema';
import { TaskService } from '../task/task.service';
import { ProjectEntity } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @Inject(forwardRef(() => TaskService))
    private readonly taskService: TaskService,
  ) {}

  async findOneById(id: number): Promise<ProjectEntity> {
    return await this.projectRepository.findOne(id);
  }

  async findAll(): Promise<ProjectEntity[]> {
    return await this.projectRepository.find({relations: ['tasks']});
  }

  async create(project: CreateProjectInput) {
      const entity = this.projectRepository.create(project);
      return await this.projectRepository.save(entity);
  }
}
