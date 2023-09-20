import { Router } from 'express';
import { crsfErrorMiddleware } from '../middlewares/csrf.middleware';
import LoginController from '../controllers/login.controller';
import { SignMiddleware } from '../middlewares/validateSign.middleware';

const UserRouter = Router();
UserRouter.get('/logout', LoginController.logout)
  .use(crsfErrorMiddleware)
  .post('/sign-up', SignMiddleware, LoginController.signUp)
  .post('/sign-in', LoginController.signIn);

export default UserRouter;
