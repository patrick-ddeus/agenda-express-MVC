import { Router } from 'express';
import Page from './page.routes';
import LoginRouter from './login.routes';
import ContactsRouter from './contact.routes';

const IndexRouter = Router();

IndexRouter.use(ContactsRouter)
.use(Page)
.use(LoginRouter);

export default IndexRouter;
