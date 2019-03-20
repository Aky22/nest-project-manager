import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskResolvers } from './task.resolvers';
import { TaskService } from './task.service';
import { TaskEntity } from './task.entity';
import { ProjectModule } from '../project/project.module';

@Module({
    imports: [forwardRef(() => ProjectModule), TypeOrmModule.forFeature([TaskEntity])],
    providers: [TaskService, TaskResolvers],
    exports: [TaskService],
})
export class TaskModule {}
