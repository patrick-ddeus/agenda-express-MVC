import { NextFunction, Request, Response } from 'express';
import { SignBody } from '../protocols';
import validator from 'validator';

export async function SignMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body as SignBody;

  if (!body.email) {
    req.flash('errors', 'Campo email não pode estar vazio!');
  }

  if (!validator.isEmail(body.email)) {
    req.flash('errors', 'Campo email deve ser um email válido!');
  }

  if (!body.password) {
    req.flash('errors', 'Campo senha não pode estar vazio!');
  }

  if (body.password.length < 10) {
    req.flash('errors', 'Senha precisa ter no mínimo 10 caracteres');
  }
  next();
}
