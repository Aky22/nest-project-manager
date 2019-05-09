
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export enum UserRole {
    ADMIN = "ADMIN",
    EDITOR = "EDITOR",
    GUEST = "GUEST"
}

export class CreateProjectInput {
    name?: string;
    description?: string;
    userIDs?: number[];
}

export class CreateTaskInput {
    name?: string;
    description?: string;
    projectID?: number;
}

export class CreateUserInput {
    username: string;
    password: string;
    email: string;
    role: UserRole;
}

export class JwtPayload {
    expires_in?: number;
    access_token?: string;
    user_id?: User;
    status?: number;
}

export abstract class IMutation {
    abstract createProject(createProjectInput?: CreateProjectInput): Project | Promise<Project>;

    abstract createUser(createUserInput?: CreateUserInput): User | Promise<User>;

    abstract createTask(createTaskInput?: CreateTaskInput): Task | Promise<Task>;
}

export class Project {
    id?: number;
    name?: string;
    description?: string;
    tasks?: Task[];
    taskCount?: number;
    users?: User;
}

export abstract class IQuery {
    abstract getProjects(): Project[] | Promise<Project[]>;

    abstract project(id: string): Project | Promise<Project>;

    abstract getUsers(): User[] | Promise<User[]>;

    abstract user(id: string): User | Promise<User>;

    abstract login(username: string, password?: string): JwtPayload | Promise<JwtPayload>;

    abstract getTasks(): Task[] | Promise<Task[]>;

    abstract task(id: string): Task | Promise<Task>;

    abstract temp__(): boolean | Promise<boolean>;
}

export abstract class ISubscription {
    abstract projectCreated(): Project | Promise<Project>;

    abstract userCreated(): User | Promise<User>;

    abstract taskCreated(): Task | Promise<Task>;
}

export class Task {
    id?: number;
    name?: string;
    description?: string;
    project?: Project;
}

export class User {
    id?: number;
    username?: string;
    password?: string;
    email?: string;
    role?: string;
}
