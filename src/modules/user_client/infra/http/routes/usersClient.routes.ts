import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import multer from 'multer';
import uploadConfig from '../../../../../config/upload';

import UsersClientController from '../controllers/UsersClientController';
import UserAvatarClientController from '../controllers/UserAvatarClientController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersClientRouter = Router();
const usersClientController = new UsersClientController();
const userAvatarClientController = new UserAvatarClientController();
const upload = multer(uploadConfig.multer);

usersClientRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersClientController.create,
);

usersClientRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarClientController.update,
);

export default usersClientRouter;
