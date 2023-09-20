import { Request, Response } from 'express';
import session from 'express-session';
import mongoose, { Types } from 'mongoose';
import ContactModel from '../models/contacts.model';
import { UpdateContactBody } from '../protocols';

async function Index(req: Request, res: Response) {
  const user = (req.session as AuthUserSession).user;
  if (!user) return res.redirect('/login/index');

  const contactsByUser = await ContactModel.find({ userId: user._id });

  return res.render('index', {
    contacts: contactsByUser,
  });
}

async function LoginPage(req: Request, res: Response) {
  const userIsLoggedIn = (req.session as AuthUserSession).user;
  if (userIsLoggedIn) return res.render('login-logado');

  res.render('login');
}

async function RegisterContactPage(req: Request, res: Response) {
  res.render('register-contact');
}

async function EditContactPage(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const [contact] = await ContactModel.find({ _id: id });

    return res.render('edit-contact', {
      contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export type AuthUserSession = session.Session &
  Partial<session.SessionData> & { user: UserPayload };

export type UserPayload = {
  email: string;
  password: string;
  _id: Types.ObjectId;
};

export default {
  Index,
  LoginPage,
  RegisterContactPage,
  EditContactPage,
};
