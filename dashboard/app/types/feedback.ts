import { Pagination } from "./pagination";

export interface Feedback {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
}

export interface Feedbacks {
    feedbacks: Feedback[];
    pagination: Pagination;
}