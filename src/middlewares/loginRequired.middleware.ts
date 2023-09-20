import { NextFunction, Request, Response } from 'express';
import { AuthUserSession } from '../controllers/page.controller';

export async function loginRequired(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!(req.session as AuthUserSession).user) {
    req.flash('errors', 'Você precisa estar logado');
    req.session.save(() => res.redirect('/'));
    return;
  }
  next();
}
