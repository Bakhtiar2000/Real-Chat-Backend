import mongoose, { Schema, model } from 'mongoose';
import { TMessage } from './message.interface';

const messageSchema = new Schema<TMessage>(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

export const Message = model<TMessage>('Message', messageSchema);
