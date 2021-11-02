import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ForgotPasswordClientController from '../controllers/ForgotPasswordClientController';
import ResetPasswordClientController from '../controllers/ResetPasswordClientController';

const passwordsClientRouter = Router();
const forgotPasswordClientController = new ForgotPasswordClientController();
const resetPasswordClientController = new ResetPasswordClientController();

passwordsClientRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordClientController.create,
);
passwordsClientRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordClientController.create,
);

export default passwordsClientRouter;
