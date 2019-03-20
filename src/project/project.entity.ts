import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TaskEntity } from '../task/task.entity';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 200 })
    name?: string;

    @Column('text')
    description?: string;

    @OneToMany(type => TaskEntity, task => task.project)
    tasks?: TaskEntity[];

    @Column('int')
    taskCount?: number;

}
