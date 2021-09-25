import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

import ensureAuthenticade from '../../../../users/infra/http/middlewares/ensureAuthenticated';

const providersRouter = Router();

const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

providersRouter.use(ensureAuthenticade);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:cooperator_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      cooperator_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabilityController.index,
);
providersRouter.get(
  '/:cooperator_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      cooperator_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilityController.index,
);

export default providersRouter;
