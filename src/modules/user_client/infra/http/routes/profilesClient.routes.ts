import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileClientController from '../controllers/ProfileClientController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profilesClientRouter = Router();
const profileClientController = new ProfileClientController();

profilesClientRouter.use(ensureAuthenticated);

profilesClientRouter.get('/', profileClientController.show);
profilesClientRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileClientController.update,
);

export default profilesClientRouter;
