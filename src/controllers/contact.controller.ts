import { Request, Response } from 'express';
import { ContactBody, UpdateContactBody } from '../protocols';
import { AuthUserSession } from './page.controller';
import ContactModel from '../models/contacts.model';
import { Types } from 'mongoose';

async function createContact(req: Request, res: Response) {
  const body = req.body as ContactBody;
  const user = (req.session as AuthUserSession).user;

  try {
    await ContactModel.create({
      email: body.email,
      lastName: body.lastName,
      name: body.name,
      tel: body.tel,
      userId: user._id,
    });
    req.flash('success', 'Contato cadastrado com sucesso!');

    return res.redirect('/register/contact');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

async function editContact(req: Request, res: Response) {
  const body = req.body as UpdateContactBody;
  const id = req.params.id

  try {
    await ContactModel.updateOne(
      {
       _id: id
      },
      {
        $set: {
          name: body.name,
          lastName: body.lastName,
          email: body.email,
          tel: body.tel,
        },
      }
    );
    req.flash('success', 'Contato atualizado com sucesso!');

    return res.redirect(`/edit/contact/${id}`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export default {
  createContact,
  editContact,
};
