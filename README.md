# thunk-source

Typescript util for getting type of bound thunk action

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
type ApplicationState = {
  /* ... */
};

type Actions = FirstAction | SecondAction /* | ... */;

const publicationPost = (): ThunkAction<
  void,
  ApplicationState,
  {},
  Actions
> => dispatch => {
  // ...
};

const mapDispatchToProps = {
  publicationPost
};

type Props = BoundThunkFromMap<typeof mapDispatchToProps>;
```

Full example:

```ts
import React from "react";
import { BoundThunk } from "thunk-source";
import { ThunkAction } from "redux-thunk";

const start = {
  type: "start"
} as const;

const stop = {
  type: "stop"
} as const;

type Actions = typeof start | typeof stop;

const publicationPost = (): ThunkAction<void, {}, {}, Actions> => dispatch => {
  dispatch(start);

  setTimeout(() => {
    dispatch(stop);
  }, 1000);
};

const mapDispatchToProps = {
  publicationPost
};

type Props = BoundThunkFromMap<typeof mapDispatchToProps>;

const MyComponent = (props: Props) => {
  this.props.publicationPost();
  // ...
};

connect(
  null,
  mapDispatchToProps
)(MyComponent);
```

Also you can get bound type from single thunk:

```ts
type Props = {
  publicationPost: BoundThunk<typeof publicationPost>;
};
```
