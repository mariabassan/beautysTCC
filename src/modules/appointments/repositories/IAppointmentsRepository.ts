import Appointment from '../infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';
import IFindByDateDTO from '../dtos/IFindByDateDTO';
import IFindAllInDayFromUserDTO from '../dtos/IFindAllInDayFromUserDTO';
import IFindAllAppointmentsDTO from '../dtos/IFindAllAppointmentsDTO';
import IFindAllUserAppointmentsDTO from '../dtos/IFindAllUserAppointmentsDTO';
import IDeleteAppointmentFromClientDTO from '../dtos/IDeleteAppointmentFromClientDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(data: IFindByDateDTO): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindAllInDayFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromUser(
    data: IFindAllInDayFromUserDTO,
  ): Promise<Appointment[]>;
  findAllAppointments(
    data: IFindAllAppointmentsDTO,
  ): Promise<Appointment[]>;
  findAllUserAppointments(
    data: IFindAllUserAppointmentsDTO,
  ): Promise<Appointment[]>;
  findAllFromClient (data: IDeleteAppointmentFromClientDTO): Promise<Appointment | undefined>;
  save(data: Appointment): Promise<Appointment>;
}
