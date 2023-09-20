import tokens from 'csrf';
import { NextFunction, Request, Response } from 'express';
import { createPageError } from '../utils/createPageError';

const Tokens = new tokens();
const secret = Tokens.secretSync();

export function CsrfMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const crsfTokenCreated = Tokens.create(secret);

  res.locals.crsfToken = crsfTokenCreated;
  next();
}

export function crsfErrorMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body as crsfBody;

  if (!Tokens.verify(secret, body?.crsfToken)) {
    return res.render('index', createPageError());
  }

  next();
}
type crsfBody = {
  crsfToken: string;
};
