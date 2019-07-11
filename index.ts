import { ThunkAction } from "redux-thunk";

export type BindedThunk<T> = T extends (
  ...args: infer P
) => ThunkAction<infer R, infer S, infer E, infer A>
  ? (...args: P) => R
  : any;
