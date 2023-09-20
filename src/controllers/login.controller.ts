import { Request, Response } from 'express';
import User from '../models/user.model';
import { SignBody } from '../protocols';
import bcrypt from 'bcrypt';
import { AuthUserSession, UserPayload } from './page.controller';

async function signUp(req: Request, res: Response) {
  const body = req.body as SignBody;

  const user = await User.findOne({ email: body?.email });

  if (user) {
    req.flash('errors', 'Email ou senha já cadastrado!');
  }

  const errors = req.flash('errors');

  if (errors.length > 0) {
    res.locals.errors = errors;
    return req.session.save(() => {
      return res.render('login');
    });
  }

  const salt = await bcrypt.genSalt(10);

  const userCreated = await User.create({
    email: body.email,
    password: await bcrypt.hash(body.password, salt),
  });

  (req.session as AuthUserSession).user = userCreated;

  req.session.save(() => {
    return res.render('login');
  });

  res.render('login', {
    success: 'Cadastrado com sucesso!',
    user: userCreated,
  });
}

async function signIn(req: Request, res: Response) {
  const body = req.body as SignBody;

  const user = await User.findOne({ email: body?.email });

  if (!user) {
    req.flash('errors', 'Email ou senha inválidos!');
  }

  const passwordIsValid = await bcrypt.compare(
    body.password,
    user?.password as string
  );

  if (!passwordIsValid) {
    req.flash('errors', 'Email ou senha inválidos!');
  }

  const errors = req.flash('errors');

  if (errors.length > 0) {
    res.locals.errors = errors;
    return res.render('login');
  }

  (req.session as AuthUserSession).user = user as UserPayload;

  res.render('index', {
    user,
  });
}

async function logout(req: Request, res: Response) {
  console.log('Caiu aqui')
  req.session.destroy((err) => console.log(err));
  res.redirect('/');
}

export default { signUp, signIn, logout };
