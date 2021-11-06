import { injectable, inject } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';
//import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
//import { classToClass } from 'class-transformer';

interface IRequest {
  user_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,

  ) {}

  public async execute({
    user_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {

    const appointments = await this.appointmentsRepository.findAllAppointments(
        {
          execept_user_id:user_id,
          day,
          month,
          year,
        },
      );

    return appointments;
  }
}
export default ListAppointmentsService;