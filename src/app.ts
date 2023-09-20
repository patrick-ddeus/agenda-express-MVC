import express from 'express';
import path from 'path';
import { connect } from './config/database';
import { CsrfMiddleware } from './middlewares/csrf.middleware';
import IndexRouter from './routers/index.routes';

import session from 'express-session';
import flash from 'connect-flash';
import MongoStore from 'connect-mongo';
import helmet from 'helmet';
import { initializeVaribles } from './middlewares/initializeVariables.middleware';

const app = express();

app.set('views', path.resolve('src', 'views'));
app.set('view engine', 'ejs');

app.use(helmet());
app.use(express.static(path.resolve('public')));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    store: new MongoStore({ mongoUrl: process.env.DATABASE_URL }),
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 },
  })
);

app.use(flash());

app.use(initializeVaribles);
app.use(CsrfMiddleware);
app.use(IndexRouter);

export async function init() {
  await connect();
  return Promise.resolve(app);
}
