import mongoose from 'mongoose';
import validator from 'validator';
import { UserPayload } from '../controllers/page.controller';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
