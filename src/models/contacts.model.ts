import mongoose, { Types } from 'mongoose';

const contactSchema = new mongoose.Schema({
  _id: { type: Types.ObjectId },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  tel: { type: String, required: true },
  userId: { type: Types.ObjectId, required: true },
});

const ContactModel = mongoose.model('Contact', contactSchema);

export default ContactModel;
