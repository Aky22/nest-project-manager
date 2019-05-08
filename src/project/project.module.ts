import { Module } from '@nestjs/common';
import { ProjectResolvers } from './project.resolvers';

@Module({
    providers: [ProjectResolvers],
})
export class ProjectModule {}
