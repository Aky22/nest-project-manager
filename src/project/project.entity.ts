import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../task/task.entity';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 200 })
    name?: string;

    @Column('text')
    description?: string;

    @OneToMany(type => Task, task => task.project)
    tasks?: Task[];

}
