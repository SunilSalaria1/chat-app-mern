import { Dispatch, createContext } from "react";
import { IUser } from "../models";
import { UserAction } from "../reducers/reducer";
export type IReducer = {
  dispatch:Dispatch<UserAction>
  state:IUser | null
};
 export const ThemeModeContext = createContext({toggleColorMode: () => {}});
 export const CurrentUserContext = createContext<IUser|null>(null);
 export const ReducerContext = createContext<IReducer | undefined>(undefined);

