import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EstablishmentController from '../controllers/EstablishmentController';
import ListEstablishmentController from '../controllers/ListEstablishmentController';

//import ensureAuthenticade from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const establishmentRouter = Router();
const establishmentController = new EstablishmentController();
const listEstablishmentController = new ListEstablishmentController();

//establishmentRouter.use(ensureAuthenticade);

establishmentRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      cnpj: Joi.string().required(),
      nomeFantasia: Joi.string().required(),
      razaoSocial: Joi.string().required(),
      phone: Joi.string(),
      cep: Joi.string().required(),
      endereco: Joi.string().required(),
      cidade: Joi.string().required(),
      uf: Joi.string().required(),
      favorite: Joi.boolean().required(),
    },
  }),
  establishmentController.create,
);
establishmentRouter.get('/', listEstablishmentController.index);

export default establishmentRouter;
