/* tslint:disable */
export class CreateProjectInput {
    name?: string;
    description?: string;
}

export class CreateTaskInput {
    name?: string;
    description?: string;
    project?: CreateProjectInput;
}

export abstract class IMutation {
    abstract createProject(createProjectInput?: CreateProjectInput): Project | Promise<Project>;

    abstract createTask(createTaskInput?: CreateTaskInput): Task | Promise<Task>;
}

export class Project {
    id?: number;
    name?: string;
    description?: string;
    tasks?: Task[];
}

export abstract class IQuery {
    abstract getProjects(): Project[] | Promise<Project[]>;

    abstract project(id: string): Project | Promise<Project>;

    abstract getTasks(): Task[] | Promise<Task[]>;

    abstract task(id: string): Task | Promise<Task>;

    abstract temp__(): boolean | Promise<boolean>;
}

export abstract class ISubscription {
    abstract projectCreated(): Project | Promise<Project>;

    abstract taskCreated(): Task | Promise<Task>;
}

export class Task {
    id?: number;
    name?: string;
    description?: string;
    project?: Project;
}
