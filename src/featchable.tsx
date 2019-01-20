import { Type } from "io-ts";
import React from "react";
import { Either, Left } from "fp-ts/lib/Either";
import { fetchJson } from "./client";
import { Remote } from "./remote";

interface FetchableProps<T, O, I> {
    url: string;
    init?: RequestInit,
    validator: Type<T, O, I>
    loading: () => JSX.Element,
    error: (error: Error) => JSX.Element,
    success: (data: T) => JSX.Element
}

interface FetchableState<T> {
    data: Either<Error | null, T>;
}

export class Fetchable<T, O, I> extends React.Component<FetchableProps<T, O, I>, FetchableState<T>> {

    public constructor(props: FetchableProps<T, O, I>) {
        super(props);
        this.state = {
            data: new Left<null, T>(null)
        }
    }

    public componentDidMount() {
        (async () => {
            const result = await fetchJson(
                this.props.url,
                this.props.validator,
                this.props.init
            );
            this.setState({
                data: result
            });
        })();
    }

    public render() {
        return (
            <Remote<T>
                loading={this.props.loading}
                error={this.props.error}
                data={this.state.data}
                success={this.props.success}
            />
        );
    }

}
