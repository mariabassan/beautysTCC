import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';
import UserAppointmentsController from '../controllers/UserAppointmentsController';
import ListAppointmentsController from '../controllers/ListAppointmentsController';
import UserAllAppointmentsController from '../controllers/UserAllAppointmentsController';

import ensureAuthenticade from '../../../../users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();
const userAppointmentsController = new UserAppointmentsController();
const listAppointmentController = new ListAppointmentsController();
const userAllAppointmentsController = new UserAllAppointmentsController();

appointmentsRouter.use(ensureAuthenticade);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      cooperator_id: Joi.string().uuid().required(),
      user_id: Joi.string().uuid().required(),
      procedure_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.get('/', listAppointmentController.index);

appointmentsRouter.get('/me/day', userAppointmentsController.index);

appointmentsRouter.get('/me', userAllAppointmentsController.index);

appointmentsRouter.get('/:cooperator_id', 
  celebrate({
    [Segments.PARAMS]: {
      cooperator_id: Joi.string().uuid().required(),
    },
  }), 
  providerAppointmentsController.index
);

appointmentsRouter.delete(
  '/me',
  celebrate({
    [Segments.BODY]: {
      cooperator_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  appointmentsController.delete,
);


export default appointmentsRouter;
