import { ThunkAction } from "redux-thunk";
import { BindedThunk, BindendThunkFromMap } from ".";

const start = {
  type: "start"
} as const;
const finish = {
  type: "finish"
} as const;
const fail = {
  type: "fail"
} as const;

type AsyncAction = typeof start | typeof finish | typeof fail;

// first test
{
  const asyncFunction = (
    data: string
  ): ThunkAction<Promise<number>, {}, {}, AsyncAction> => async dispatch => {
    dispatch(start);

    try {
      const result = await Promise.resolve(200);
      dispatch(finish);
      return result;
    } catch (error) {
      dispatch(fail);
      return 500;
    }
  };

  type BindedAsyncFunction = BindedThunk<typeof asyncFunction>;
  const testFunction: BindedAsyncFunction = (data: string) =>
    Promise.resolve(200);
}

// second test
{
  const asyncFunction = (
    data: string,
    count: number
  ): ThunkAction<Promise<void>, {}, {}, AsyncAction> => async dispatch => {
    dispatch(start);

    try {
      await Promise.resolve(200);
      dispatch(finish);
    } catch (error) {
      dispatch(fail);
    }
  };

  type BindedAsyncFunction = BindedThunk<typeof asyncFunction>;
  const testFunction: BindedAsyncFunction = (data: string, count: number) =>
    Promise.resolve();
}

// thrid test
{
  const asyncFunction1 = (
    data: string,
    count: number
  ): ThunkAction<void, {}, {}, AsyncAction> => async dispatch => {};
  const asyncFunction2 = (
    toggle: boolean,
  ): ThunkAction<void, {}, {}, AsyncAction> => async dispatch => {};

  const mapDispatchToProps = {
    asyncFunction1,
    asyncFunction2,
    a: () => 'asd' as const
  };

  type DispatchProps = BindendThunkFromMap<typeof mapDispatchToProps>;

  const props: DispatchProps = {
    asyncFunction1: (data: string, count: number) => {},
    asyncFunction2: (toggle: boolean) => {},
    a: () => 'asd'
  }
}
