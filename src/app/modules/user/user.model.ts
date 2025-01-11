import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser, UserModel>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            select: 0,
        },
        img: {
            type: String,
        },
    }
);

userSchema.post('save', function (doc, next) {
    //Posting password empty in database
    doc.password = '';
    next();
});


userSchema.statics.isUserExistsByEmail = async function (email) {
    return await User.findOne({ email }).select('+password'); // As password field was set to select 0 in the model, we had to explicitly select this field here. '+password' means password and other fields as well
};


export const User = model<TUser, UserModel>('User', userSchema);
