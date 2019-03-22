import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findOneById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne(id, {relations: ['project']});
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({relations: ['project']});
  }

  async findAllByProject(projectID: number): Promise<UserEntity[]> {
    return await this.userRepository.find({where: {project: {id: projectID}}});
  }

  async findOneByUsername(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({where: {username}});
  }
}
