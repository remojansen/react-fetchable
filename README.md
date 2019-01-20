# react-fetchable

Data fetching in React the functional way powered by TypeScript, io-ts &amp; fp-ts

## What is this?

This small library uses the encoding and decoding capabilities of [io-ts](https://github.com/gcanti/io-ts) and the algebraic data types of [fp-ts](https://github.com/gcanti/fp-ts) to provide developers with a type-safe and declarative data fetching API for React applications:

```ts
<Fetchable
  url="/data/schedule.json"
  validator={ActivityArrayValidator}
  loading={() => <div>Loading...</div>}
  error={(e: Error) => <div>Error: {e.message}</div>}
  success={(data: IActivityArray) => {
    return (
      <Table
        headers={["Time", "Activity"]}
        rows={data.map(a => [`${a.startTime}`, a.title])}
      />
    );
  }}
/>
```

## Motivation

Loading data in React it is a very repetitive and tedious task. If that wasn't bad enough, the data contained in an HTTP response could be completely different from what we are expecting. 

The type-unsafe nature of fetch calls is particularly dangerous for TypeScript users because it compromises many of the benefits of TypeScript.

You can read [***Data fetching in React the functional way powered by TypeScript, io-ts & fp-ts***](https://dev.to/remojansen/data-fetching-in-react-the-functional-way-powered-by-typescript-io-ts--fp-ts-ojf) fo find out more.

## Installation

You can install this module using npm:

```
npm install io-ts fp-ts react-fetchable
```

You can then import it as follows:

```ts
import { Fetchable } from "react-fetchable";
```

## Options

| Prop        | Description                                                                           |
|-------------|---------------------------------------------------------------------------------------|
| `url`       | The URI of the resource to be loaded                                                  |
| `validator` | A value of the io-ts type [`Type<A, O, I>`](https://github.com/gcanti/io-ts#the-idea) |
| `loading`   | Provides the JSX to be rendered while the resource is loading.                        |
| `error`     | Provides the JSX to be rendered if the data loaded and validated incorrectly.         |
| `success`   | Provides the JSX to be rendered if the data loaded and validated correctly.           |
| `init`      | An instance of `RequestInit` that can be used to configure the `fetch` call.          |
