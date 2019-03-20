import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectResolvers } from './project.resolvers';

@Module({
    imports: [TypeOrmModule.forFeature([Project])],
    providers: [ProjectService, ProjectResolvers],
    controllers: [ProjectController],
    exports: [ProjectService],
})
export class ProjectModule {}
