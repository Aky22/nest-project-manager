import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { TaskEntity } from '../task/task.entity';
import { UserEntity } from '../user/user.entity';

@Entity()
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 200 })
    name?: string;

    @Column('text')
    description?: string;

    @OneToMany(type => TaskEntity, task => task.project)
    tasks?: TaskEntity[];

    @ManyToMany(type => UserEntity, user => user.project)
    users?: UserEntity[];

}
