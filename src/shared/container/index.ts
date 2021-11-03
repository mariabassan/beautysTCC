import { container } from 'tsyringe';

import '../../modules/users/providers'
import './providers';

import IAppointmentsRepository from '../../modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '../../modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '../../modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '../../modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '../../modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '../../modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import ICooperatorRepository from '../../modules/cooperator/repositories/ICooperatorRepository';
import CooperatorRepository from '../../modules/cooperator/infra/typeorm/repositories/CooperatorRepository';

import IEstablishmentRepository from '../../modules/establishment/repositories/IEstablishmentRepository';
import EstablishmentRepository from '../../modules/establishment/infra/typeorm/repositories/EstablishmentRepository';

import IProcedureRepository from '../../modules/procedure/repositories/IProcedureRepository';
import ProcedureRepository from '../../modules/procedure/infra/typeorm/repositories/ProcedureRepository';

import IUsersClientRepository from '../../modules/user_client/repositories/IUsersClientRepository';
import UsersClientRepository from '../../modules/user_client/infra/typeorm/repositories/UsersClientRepository';

import IUserTokensClientRepository from '../../modules/user_client/repositories/IUserTokensClientRepository';
import UserTokensClientRepository from '../../modules/user_client/infra/typeorm/repositories/UserTokensClientRepository';


container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IUsersClientRepository>(
  'UsersClientRepository',
  UsersClientRepository,
);

container.registerSingleton<IUserTokensClientRepository>(
  'UserTokensClientRepository',
  UserTokensClientRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

container.registerSingleton<any>(
  'CooperatorRepository',
  CooperatorRepository,
);

container.registerSingleton<IProcedureRepository>(
  'ProcedureRepository',
  ProcedureRepository,
);

container.registerSingleton<IEstablishmentRepository>(
  'EstablishmentRepository',
  EstablishmentRepository,
);
