import { ThunkAction } from "redux-thunk";

export type BoundThunk<T> = T extends (
  ...args: infer P
) => ThunkAction<infer R, infer S, infer E, infer A>
  ? (...args: P) => R
  : T;

export type BoundThunkFromMap<M> = { [K in keyof M]: BoundThunk<M[K]> };
