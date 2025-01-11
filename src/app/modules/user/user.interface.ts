/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUser {
    name: string;
    email: string;
    password: string;
    img: string;
}

export interface UserModel extends Model<TUser> {
    isUserExistsByEmail(email: string): Promise<TUser>;
}

