import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './project.entity';
import { ProjectResolvers } from './project.resolvers';

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity])],
    providers: [ProjectResolvers],
})
export class ProjectModule {}
