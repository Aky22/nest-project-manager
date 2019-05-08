
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export enum MutationType {
    CREATED = "CREATED",
    UPDATED = "UPDATED",
    DELETED = "DELETED"
}

export enum UserOrderByInput {
    id_ASC = "id_ASC",
    id_DESC = "id_DESC",
    username_ASC = "username_ASC",
    username_DESC = "username_DESC",
    password_ASC = "password_ASC",
    password_DESC = "password_DESC",
    email_ASC = "email_ASC",
    email_DESC = "email_DESC",
    role_ASC = "role_ASC",
    role_DESC = "role_DESC"
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

export class UserCreateInput {
    id?: string;
    username: string;
    password: string;
    email: string;
    role: string;
}

export class UserSubscriptionWhereInput {
    AND: UserSubscriptionWhereInput[];
    OR: UserSubscriptionWhereInput[];
    NOT: UserSubscriptionWhereInput[];
    mutation_in: MutationType[];
    updatedFields_contains?: string;
    updatedFields_contains_every: string[];
    updatedFields_contains_some: string[];
    node?: UserWhereInput;
}

export class UserUpdateInput {
    username?: string;
    password?: string;
    email?: string;
    role?: string;
}

export class UserUpdateManyMutationInput {
    username?: string;
    password?: string;
    email?: string;
    role?: string;
}

export class UserWhereInput {
    AND: UserWhereInput[];
    OR: UserWhereInput[];
    NOT: UserWhereInput[];
    id?: string;
    id_not?: string;
    id_in: string[];
    id_not_in: string[];
    id_lt?: string;
    id_lte?: string;
    id_gt?: string;
    id_gte?: string;
    id_contains?: string;
    id_not_contains?: string;
    id_starts_with?: string;
    id_not_starts_with?: string;
    id_ends_with?: string;
    id_not_ends_with?: string;
    username?: string;
    username_not?: string;
    username_in: string[];
    username_not_in: string[];
    username_lt?: string;
    username_lte?: string;
    username_gt?: string;
    username_gte?: string;
    username_contains?: string;
    username_not_contains?: string;
    username_starts_with?: string;
    username_not_starts_with?: string;
    username_ends_with?: string;
    username_not_ends_with?: string;
    password?: string;
    password_not?: string;
    password_in: string[];
    password_not_in: string[];
    password_lt?: string;
    password_lte?: string;
    password_gt?: string;
    password_gte?: string;
    password_contains?: string;
    password_not_contains?: string;
    password_starts_with?: string;
    password_not_starts_with?: string;
    password_ends_with?: string;
    password_not_ends_with?: string;
    email?: string;
    email_not?: string;
    email_in: string[];
    email_not_in: string[];
    email_lt?: string;
    email_lte?: string;
    email_gt?: string;
    email_gte?: string;
    email_contains?: string;
    email_not_contains?: string;
    email_starts_with?: string;
    email_not_starts_with?: string;
    email_ends_with?: string;
    email_not_ends_with?: string;
    role?: string;
    role_not?: string;
    role_in: string[];
    role_not_in: string[];
    role_lt?: string;
    role_lte?: string;
    role_gt?: string;
    role_gte?: string;
    role_contains?: string;
    role_not_contains?: string;
    role_starts_with?: string;
    role_not_starts_with?: string;
    role_ends_with?: string;
    role_not_ends_with?: string;
}

export class UserWhereUniqueInput {
    id?: string;
}

export interface Node {
    id: string;
}

export class AggregateUser {
    count: number;
}

export class BatchPayload {
    count: Long;
}

export abstract class IMutation {
    abstract createUser(data: UserCreateInput): User | Promise<User>;
    abstract updateUser(data: UserUpdateInput, where: UserWhereUniqueInput): User | Promise<User>;
    abstract deleteUser(where: UserWhereUniqueInput): User | Promise<User>;
    abstract upsertUser(where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput): User | Promise<User>;
    abstract updateManyUsers(data: UserUpdateManyMutationInput, where?: UserWhereInput): BatchPayload | Promise<BatchPayload>;
    abstract deleteManyUsers(where?: UserWhereInput): BatchPayload | Promise<BatchPayload>;
    abstract createProject(createProjectInput?: CreateProjectInput): Project | Promise<Project>;
    abstract createTask(createTaskInput?: CreateTaskInput): Task | Promise<Task>;
}

export class PageInfo {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
}

export class Project {
    projectId?: number;
    name?: string;
    description?: string;
    tasks?: Task[];
    taskCount?: number;
    users?: User;
}

export abstract class IQuery {
    abstract users(where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: number, after?: string, before?: string, first?: number, last?: number): User[] | Promise<User[]>;
    abstract user(where: UserWhereUniqueInput): User | Promise<User>;
    abstract usersConnection(where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: number, after?: string, before?: string, first?: number, last?: number): UserConnection | Promise<UserConnection>;
    abstract node(id: string): Node | Promise<Node>;
    abstract getProjects(): Project[] | Promise<Project[]>;
    abstract project(id: string): Project | Promise<Project>;
    abstract getTasks(): Task[] | Promise<Task[]>;
    abstract task(id: string): Task | Promise<Task>;
    abstract temp__(): boolean | Promise<boolean>;
}

export abstract class ISubscription {
    abstract user(where?: UserSubscriptionWhereInput): UserSubscriptionPayload | Promise<UserSubscriptionPayload>;
    abstract projectCreated(): Project | Promise<Project>;
    abstract taskCreated(): Task | Promise<Task>;
}

export class Task {
    id?: number;
    name?: string;
    description?: string;
    project?: Project;
}

export class User implements Node {
    id: string;
    username: string;
    password: string;
    email: string;
    role: string;
}

export class UserConnection {
    pageInfo: PageInfo;
    edges?: UserEdge[];
    aggregate: AggregateUser;
}

export class UserEdge {
    node: User;
    cursor: string;
}

export class UserPreviousValues {
    id: string;
    username: string;
    password: string;
    email: string;
    role: string;
}

export class UserSubscriptionPayload {
    mutation: MutationType;
    node?: User;
    updatedFields: string[];
    previousValues?: UserPreviousValues;
}

export type Long = any;
