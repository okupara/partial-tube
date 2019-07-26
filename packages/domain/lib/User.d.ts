export interface User {
    name: string;
    avatarUrl: string;
}
export declare const createUser: (name: string, avatarUrl: string) => User;
