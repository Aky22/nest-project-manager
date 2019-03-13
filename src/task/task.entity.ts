import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from '../project/project.entity';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;

    @Column('text')
    description?: string;

    @ManyToOne(type => Project, project => project.tasks)
    project?: Project;

}
