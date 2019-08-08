import * as t from 'io-ts';
export interface Record {
    name: string;
    avatarUrl: string | null;
}
export declare const create: (anything: unknown) => import("fp-ts/lib/Either").Either<t.Errors, Record>;
