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

export abstract class IMutation {
    abstract createProject(createProjectInput?: CreateProjectInput): Project | Promise<Project>;

    abstract createTask(createTaskInput?: CreateTaskInput): Task | Promise<Task>;

    abstract createUser(createUserInput?: CreateUserInput): User | Promise<User>;
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

    abstract getTasks(): Task[] | Promise<Task[]>;

    abstract task(id: string): Task | Promise<Task>;

    abstract getUsers(): User[] | Promise<User[]>;

    abstract user(id: string): User | Promise<User>;

    abstract temp__(): boolean | Promise<boolean>;
}

export abstract class ISubscription {
    abstract projectCreated(): Project | Promise<Project>;

    abstract taskCreated(): Task | Promise<Task>;

    abstract userCreated(): User | Promise<User>;
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
