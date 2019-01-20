import React from "react";
import { Either } from "fp-ts/lib/either";

interface RemoteProps<T> {
  data: Either<Error | null, T>;
  loading: () => JSX.Element,
  error: (error: Error) => JSX.Element,
  success: (data: T) => JSX.Element
}

interface RemoteState {}

export class Remote<T> extends React.Component<RemoteProps<T>, RemoteState> {

  public render() {
    return (
      <React.Fragment>
      {
        this.props.data.bimap(
          l => {
            if (l === null) {
              return this.props.loading();
            } else {
              return this.props.error(l);
            }
          },
          r => {
            return this.props.success(r);
          }
        ).value
      }
      </React.Fragment>
    );
  }

}

export default Remote;
