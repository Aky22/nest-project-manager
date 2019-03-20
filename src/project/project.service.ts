import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async findOneById(id: number): Promise<Project> {
    return await this.projectRepository.findOne(id);
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find({relations: ['tasks']});
  }

  async create(project: Project) {
      const entity = this.projectRepository.create(project);
      entity.taskCount = entity.tasks.length;
      return await this.projectRepository.save(entity);
  }
}
