import { Types } from 'mongoose';

export interface TMessage {
    senderId: Types.ObjectId;
    receiverId: Types.ObjectId;
    text: string;
    image: string;
}
