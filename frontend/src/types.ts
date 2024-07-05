export interface IUserSidebar {
  id: number;
  name: string;
}

export interface IMessageRes {
  id: number;
  sender: number;
  recipient: number;
  content: string;
}

export interface IMessage {
  content: string;
  isSender: boolean;
}

export type SetMessageType = React.Dispatch<React.SetStateAction<IMessage[]>>;

export interface IUser {
  id: number;
  name: string;
  isAdded: boolean;
}
