import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { TaskEntity } from '../task/task.entity';
import { UserEntity } from '../user/user.entity';

@Entity()
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    projectId?: string;

    @Column({ length: 200 })
    name?: string;

    @Column('text')
    description?: string;

    @OneToMany(type => TaskEntity, task => task.project)
    tasks?: Promise<TaskEntity[]>;

    @ManyToMany(type => UserEntity, user => user.project)
    @JoinTable()
    users?: Promise<UserEntity[]>;

}
