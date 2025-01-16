import { User } from "../auth/auth.model";
import { Message } from "./message.model";
import { getReceiverSocketId, io } from "../../lib/socket";
import cloudinary from "../../lib/cloudinary";

const getSidebarUsersFromDB = async (email: string) => {
    const result = await User.find({ email: { $ne: email } }).select("-password");
    return result
};

const getAllMessagesFromDB = async (userToChatId: string, myId: string) => {
    const result = await Message.find({
        $or: [
            { senderId: myId, receiverId: userToChatId },
            { senderId: userToChatId, receiverId: myId },
        ],
    });
    return result
};

const sendMessage = async (payload: { text?: string, image?: string }, receiverId: string, senderId: string) => {
    const { text, image } = payload;
    let imageUrl;
    if (image) {
        const uploaded = await cloudinary.uploader.upload(image);
        imageUrl = uploaded.secure_url;
    }

    console.log({
        senderId,
        receiverId,
        text,
        image: imageUrl,
    })

    const result = await Message.create({
        senderId,
        receiverId,
        text,
        image: imageUrl,
    });

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", result); // Emitting with the name newMessage
    }
    return result

};

export const messageServices = {
    getSidebarUsersFromDB,
    getAllMessagesFromDB,
    sendMessage
} 