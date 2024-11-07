export type TaskStatus = 'TODO' | 'INPROGRESS'  | 'COMPLETED' | 'DEFERRED' | 'CANCELLED';

export interface TaskResponse {
    id: number,

    title: string,

    description: string,

    dueDate: Date,

    userId: number,

    name: string;

    categoryId: number,

    categoryLabel: string;

    taskStatus: TaskStatus;
}
