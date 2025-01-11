import config from "../../config";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from 'bcrypt';

const registerUserIntoDB = async (payload: TUser) => {
    // Hash new password
    const hashedPassword = await bcrypt.hash(
        payload?.password,
        Number(config.bcrypt_salt_rounds)
    );

    payload.password = hashedPassword
    const result = await User.create(payload);
    return result;
};

export const UserServices = {
    registerUserIntoDB
} 