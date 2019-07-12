import { ThunkAction } from "redux-thunk";

export type BindedThunk<T> = T extends (
  ...args: infer P
) => ThunkAction<infer R, infer S, infer E, infer A>
  ? (...args: P) => R
  : T;

export type BindendThunkFromMap<M> = M extends {
  [key: string]: infer B;
}
  ? {
      [K in keyof M]: BindedThunk<M[K]>
    }
  : M;
