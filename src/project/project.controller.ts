import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { TaskService } from 'src/task/task.service';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/test')
  findAll(): Promise<any[]> {
    return this.projectService.findAll();
  }

  @Post('/create')
  async create(@Body() project: Project, @Res() res) {
      this.projectService.create(project);
      res.status(HttpStatus.CREATED).send();
  }

}
