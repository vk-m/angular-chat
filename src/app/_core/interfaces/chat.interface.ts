import { IMessage } from "./message.interface";
import { IUser } from './user.interface';

export interface IChat {
    id: number;
    user: IUser;
    messages: IMessage[];
    lastMessage: string;
    lastTimestamp: number;
}