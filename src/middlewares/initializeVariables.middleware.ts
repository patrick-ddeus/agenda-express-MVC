import { NextFunction, Request, Response } from 'express';
import { AuthUserSession } from '../controllers/page.controller';

export function initializeVaribles(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = (req.session as AuthUserSession).user;
  res.locals.contacts = [];

  next();
}
