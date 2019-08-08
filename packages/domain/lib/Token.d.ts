import * as io from 'io-ts';
export interface Record {
    value: string;
}
export declare const create: (anything: unknown) => import("fp-ts/lib/Either").Either<io.Errors, Record>;
