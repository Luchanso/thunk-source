# thunk-source

Typescript util for getting type of binded thunk action

## Install:

```sh
yarn add thunk-source -D
```

install via npm:

```sh
npm i thunk-source --dev
```

## Usage

```ts
import React from 'react';
import { BindedThunk } from "thunk-source";
import { ThunkAction } from "redux-thunk";

const start = {
    type: 'start'
} as const;

const stop = {
    type: 'stop'
} as const;

type Actions = typeof start | typeof stop;

const publicationPost = (): ThunkAction<void, {}, {}, Actions> => (dispatch) => {
    dispatch(start);

    setTimeout(() => {
        dispatch(stop);
    }, 1000);
}

const mapDispatchToProps = {
    publicationPost
};

type Props = {
    publicationPost: BindedThunk<typeof publicationPost>
};

const MyComponent = (props: Props) => {
    this.props.publicationPost();
    // ...
};

connect(null, mapDispatchToProps)(MyComponent);
```

## TODO
- [ ] Get calculated types from mapDispatchToProps
