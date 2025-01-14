import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';

const userSchema = new Schema<TUser, UserModel>(
    {
        fullName: {
            type: String,
            required: [true, 'fullName is required'],
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
        profilePic: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
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
