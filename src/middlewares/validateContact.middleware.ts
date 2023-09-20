import { NextFunction, Request, Response } from 'express';
import validator from 'validator';
import { ContactBody } from '../protocols';

export async function ValidateContact(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body as ContactBody;
  let isValid = true;

  if (!validator.isEmail(body.email)) {
    req.flash('errors', 'Campo Email deve ser um email válido!');
    isValid = false
  }

  if (!body.name) {
    req.flash('errors', 'Campo Nome não pode estar vazio!');
    isValid = false
  }

  if (!body.lastName) {
    req.flash('errors', 'Campo Sobrenome não pode estar vazio!');
    isValid = false
  }

  if (!body.tel) {
    req.flash('errors', 'Campo Telefone não pode estar vazio!');
    isValid = false
  }

  if(!isValid){
    return res.redirect('/register/contact');
  }

  next();
}
