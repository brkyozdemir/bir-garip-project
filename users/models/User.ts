import { Schema, model, Document, Model } from 'mongoose';

const requiredString = {
  type: String,
  required: true
};

export interface IUser extends Document{
  email: string;
  password: string;
  username: string;
  resetToken: string;
  resetTokenExpiration: string;
  books: Array<any>;
}

const userSchema: Schema = new Schema({
  email: requiredString,
  password: requiredString,
  username: requiredString,
  resetToken: String,
  resetTokenExpiration: Date,
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'books'
    }
  ]
}, { timestamps: true });

export const UserModel: Model<IUser> = model('users', userSchema);