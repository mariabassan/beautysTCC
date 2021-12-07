import { injectable, inject } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';
import ICacheProvider from '../../../shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

interface IRequest {
  user_id: string;
  //year: number;
}

@injectable()
class ListUserAllAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    //year,
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${user_id}`;

    let appointments = await this.cacheProvider.recover<Appointment[]>(
      cacheKey,
    );

    //if (!appointments) {
      appointments = await this.appointmentsRepository.findAllUserAppointments(
        {
          user_id: user_id,
          //year,
        },
      );

      await this.cacheProvider.save(cacheKey, classToClass(appointments));
    //}

    return appointments;
  }
}

export default ListUserAllAppointmentsService;
