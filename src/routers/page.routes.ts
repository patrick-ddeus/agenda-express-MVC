import { Router } from 'express';
import PageController from '../controllers/page.controller';
import { loginRequired } from '../middlewares/loginRequired.middleware';

const Page = Router();
Page.get('/', PageController.Index)
  .get('/login/index', PageController.LoginPage)
  .get('/register/contact', loginRequired, PageController.RegisterContactPage)
  .get('/edit/contact/:id', loginRequired, PageController.EditContactPage);

export default Page;
