import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../graphql.schema';

@Injectable()
export class TaskService {
    async findOneById(id: number): Promise<Task> {
        return await this.taskRepository.findOne(id, {relations: ["project"]});
    }
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({relations: ["project"]});
  }

  async create(task: Task) {
      const entity = this.taskRepository.create(task);
      return await this.taskRepository.save(entity);
  }
}