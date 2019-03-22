import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskResolvers } from './task.resolvers';
import { TaskEntity } from './task.entity';
import { ProjectEntity } from '../project/project.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TaskEntity, ProjectEntity])],
    providers: [TaskResolvers],
})
export class TaskModule {}
