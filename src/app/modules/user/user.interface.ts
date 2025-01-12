/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUser {
    fullName: string;
    email: string;
    password: string;
    profilePic: string;
}

export interface UserModel extends Model<TUser> {
    isUserExistsByEmail(email: string): Promise<TUser>;
}

