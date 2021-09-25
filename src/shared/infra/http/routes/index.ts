import { Router } from 'express';

import appointmentsRouter from '../../../../modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';
import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.routes';
import passwordsRouter from '../../../../modules/users/infra/http/routes/passwords.routes';
import profilesRouter from '../../../../modules/users/infra/http/routes/profiles.routes';
import providersRouter from '../../../../modules/appointments/infra/http/routes/providers.routes';
import establishmentRouter from '../../../../modules/establishment/infra/http/routes/establishment.routes';
import coopertatorRouter from '../../../../modules/cooperator/infra/http/routes/cooperator.routes';
import procedureRouter from '../../../../modules/procedure/infra/http/routes/procedure.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/providers', providersRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordsRouter);
routes.use('/profile', profilesRouter);
routes.use('/establishment', establishmentRouter);
routes.use('/cooperator', coopertatorRouter);
routes.use('/procedure', procedureRouter);

export default routes;
