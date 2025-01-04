import { IUser } from "../models";

export type UserAction =
  | { type: "currentContact"; user?: IUser }
  | { type: "emptyState"; user?: IUser }
  | { type: "group"; group?: any };
export function currentSelectedUserReducer(
  state: IUser | null,
  action: UserAction
) {
  switch (action.type) {
    case "currentContact":
      return { ...state, ...action.user };
    case "group":
      return { ...state, ...action.group };
    case "emptyState":
      return null;
    default:
      return state;
  }
}
