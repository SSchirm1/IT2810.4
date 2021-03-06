import { RootState } from "../../store/store";
import { useStore } from "react-redux";
import { ActionCreatorsMapObject } from "redux";
import { useMemo } from "react";
import { BoundActions } from "./interfaces";

/* Returns the actions available from the store */
export const useActions = <M extends ActionCreatorsMapObject>(actions: M) => {
  const { dispatch, getState } = useStore<RootState>();
  const returnKeys = () =>
    Object.keys(actions).reduce<Partial<BoundActions<M>>>(
      (res, key) => ({
        ...res,
        [key]: (...args: any) => {
          const action = actions[key](...args);
          return typeof action === "function"
            ? action(dispatch, getState)
            : dispatch(action);
        },
      }),
      {}
    ) as BoundActions<M>;
  return useMemo(returnKeys, []);
};
