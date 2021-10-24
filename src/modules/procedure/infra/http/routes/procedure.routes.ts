import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProcedureController from '../controllers/ProcedureController';
import ListProcedureController from '../controllers/ListProcedureController';
//import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

//import ensureAuthenticade from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const procedureRouter = Router();
const procedureController = new ProcedureController();
const listProcedureController = new ListProcedureController();

//procedureRouter.use(ensureAuthenticade);

procedureRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.string().required(),
    },
  }),
  procedureController.create,
);
procedureRouter.get('/', listProcedureController.index);

export default procedureRouter;
