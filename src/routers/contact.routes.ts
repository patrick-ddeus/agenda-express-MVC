import { Router } from 'express';
import contactController from '../controllers/contact.controller';
import { ValidateContact } from '../middlewares/validateContact.middleware';

const ContactsRouter = Router();
ContactsRouter.post(
  '/register/contact',
  ValidateContact,
  contactController.createContact
);
ContactsRouter.post(
  '/edit/contact/:id',
  contactController.editContact
);

export default ContactsRouter;
