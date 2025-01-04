import { Dispatch, createContext } from "react";
import { IUser } from "../models";
import { UserAction } from "../reducers/reducer";
export type IUserContext = {
  dispatch:Dispatch<UserAction>
  state:IUser | null
};
 export const ThemeModeContext = createContext({toggleColorMode: () => {}});
 export const CurrentUserContext = createContext<IUser|null>(null);
 export const UserContext = createContext<IUserContext | undefined>(undefined);

