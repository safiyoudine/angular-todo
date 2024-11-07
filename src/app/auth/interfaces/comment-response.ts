export interface CommentResponse {
    id: number,
    content: string,
    createdAt: Date,
    userId: number,
    taskId: number,
    postedBy: string;
}
