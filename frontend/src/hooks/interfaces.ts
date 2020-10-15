import { ActionCreatorsMapObject } from "redux";
export type BoundActions<M extends ActionCreatorsMapObject> = {
  [N in keyof M]: (...args: Parameters<M[N]>) => ReturnType<ReturnType<M[N]>>;
};
