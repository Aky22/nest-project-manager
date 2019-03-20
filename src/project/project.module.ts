import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './project.entity';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectResolvers } from './project.resolvers';
import { TaskModule } from '../task/task.module';

@Module({
    imports: [forwardRef(() => TaskModule), TypeOrmModule.forFeature([ProjectEntity])],
    providers: [ProjectService, ProjectResolvers],
    controllers: [ProjectController],
    exports: [ProjectService],
})
export class ProjectModule {}
