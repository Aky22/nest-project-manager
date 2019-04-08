import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BeforeInsert } from 'typeorm';
import { ProjectEntity } from '../project/project.entity';
import * as crypto from 'crypto';

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
  username?: string;

  @Column()
  password?: string;

  @Column()
  email?: string;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha512', this.password).digest('hex');
  }

  @ManyToMany(type => ProjectEntity, project => project.users)
  project?: ProjectEntity[];

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GUEST,
  })
  role: UserRole;

}
