import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskResolvers } from './task.resolvers';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    providers: [TaskService, TaskResolvers],
})
export class TaskModule {}
