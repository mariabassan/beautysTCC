import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionsClientController from '../controllers/SessionsClientController';

const sessionsClientRouter = Router();
const sessionsClientController = new SessionsClientController();

sessionsClientRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsClientController.create,
);

export default sessionsClientRouter;
