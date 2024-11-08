import { IUser } from '../models';

export type UserAction = { type: 'currentContact',user?:IUser } | { type: 'emptyState',user?:IUser };
export function currentSelectedUserReducer(state: IUser|null, action: UserAction) {
	switch (action.type) {
		case 'currentContact':
			return {...state,...action.user} as IUser;
			case 'emptyState':
				return null
		default:
			return state;
	}
}
