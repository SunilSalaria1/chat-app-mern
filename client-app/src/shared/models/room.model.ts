import { IUser } from './user.model';

export interface IRoom {
  _id: string;
  name: string;
  description: string;
  createdBy: string;
  updatedBy: string;
  members: IUser[];
  messages: string[];
  isGroup: boolean;
  groupIcon: string;
  admin: string[];
}
