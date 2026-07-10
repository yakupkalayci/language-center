import { Pagination } from "./Pagination";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string[];
    createdAt: string;
    updatedAt: string;
}



export interface Users {
    users: User[];
    pagination: Pagination;
}