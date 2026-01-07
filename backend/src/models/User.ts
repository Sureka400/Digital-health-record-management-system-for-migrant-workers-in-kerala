import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from '../data/users';

export interface IUser extends Document {
  username: string;
  password: string;
  role: UserRole;
  name: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['worker', 'doctor', 'admin'], 
    default: 'worker' 
  },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>('User', UserSchema);
