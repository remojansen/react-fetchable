import { Either, Left, Right } from "fp-ts/lib/Either";
import * as io from "io-ts";
import { reporter } from "io-ts-reporters";

export async function fetchJson<T, O, I>(
    url: string,
    validator: io.Type<T, O, I>,
    init?: RequestInit
): Promise<Either<Error, T>> {
    try {
        const response = await fetch(url, init);
        const json: I = await response.json();
        const result = validator.decode(json);
        return result.fold<Either<Error, T>>(
            (errors: io.Errors) => {
                const messages = reporter(result);
                return new Left<Error, T>(new Error(messages.join("\n")));
            },
            (value: T) => {
                return new Right<Error, T>(value);
            }
        );
    } catch (err) {
        return Promise.resolve(new Left<Error, T>(err));
    }
}
