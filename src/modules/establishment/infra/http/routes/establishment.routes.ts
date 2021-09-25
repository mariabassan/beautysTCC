import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EstablishmentController from '../controllers/EstablishmentController';
import ListEstablishmentController from '../controllers/ListEstablishmentController';
//import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

//import ensureAuthenticade from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const establishmentRouter = Router();
const establishmentController = new EstablishmentController();
const listestablishmentController = new ListEstablishmentController();

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
      numero: Joi.string().required(),
      cidade: Joi.string().required(),
      uf: Joi.string().required(),
      ramo: Joi.string().required(),
    },
  }),
  establishmentController.create,
);
establishmentRouter.get('/me', listestablishmentController.index);

export default establishmentRouter;
