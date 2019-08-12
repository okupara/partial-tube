import * as t from 'io-ts';
export interface Record {
    value: string;
}
export declare const create: (anything: unknown) => import("fp-ts/lib/Either").Either<t.Errors, Record>;
