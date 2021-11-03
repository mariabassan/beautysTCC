import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CooperatorController from '../controllers/CooperatorController';
import ListCooperatorController from '../controllers/ListCooperatorController';
import ListCooperatorEstabController from '../controllers/ListCooperatorEstabController';

const cooperatorsRouter = Router();
const cooperatorsController = new CooperatorController();
const listCooperatorController = new ListCooperatorController();
const listCooperatorEstabController = new ListCooperatorEstabController();

cooperatorsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      phone: Joi.string().required(),
    },
  }),
  cooperatorsController.create,
);

cooperatorsRouter.get('/', listCooperatorController.index);

cooperatorsRouter.get(
  '/estab',
  celebrate({
    [Segments.PARAMS]: {
      estab_cnpj: Joi.string().required(),
    },
  }),
  listCooperatorEstabController.index,
);

export default cooperatorsRouter;
