import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ProjectEntity } from '../project/project.entity';

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  GUEST = 'guest',
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @ManyToMany(type => ProjectEntity, project => project.users)
  project?: ProjectEntity[];

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GUEST,
  })
  role: UserRole;

}
