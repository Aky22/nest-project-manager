import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
  }

  async findOneById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne(id, { relations: ['project'] });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({ relations: ['project'] });
  }

  async findAllByProject(projectID: number): Promise<UserEntity[]> {
    return await this.userRepository.find({ where: { project: { id: projectID } } });
  }

  async findOneByUsername(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({where: {username}});
    if (crypto.createHmac('sha512', password).digest('hex') === user.password) {
      return user;
    } else {
      return false;
    }
  }

}
