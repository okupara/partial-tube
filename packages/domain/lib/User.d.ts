export interface Record {
    name: string;
    avatarUrl: string | null;
}
export declare const createUser: (n: string | null, u: string | null) => Record;
