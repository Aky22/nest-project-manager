import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProjectEntity } from '../project/project.entity';

@Entity()
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;

    @Column('text')
    description?: string;

    @ManyToOne(type => ProjectEntity, project => project.tasks)
    project?: Promise<ProjectEntity>;

}
