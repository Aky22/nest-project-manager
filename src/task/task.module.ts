import { Module } from '@nestjs/common';
import { TaskResolvers } from './task.resolvers';

@Module({
    providers: [TaskResolvers],
})
export class TaskModule {}
