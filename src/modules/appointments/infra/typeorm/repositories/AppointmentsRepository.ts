import { getRepository, Repository, Raw } from 'typeorm';

import ICraeteAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import IFindByDateDTO from '@modules/appointments/dtos/IFindByDateDTO';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate({
    date,
    cooperator_id,
  }: IFindByDateDTO): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date, cooperator_id },
    });
    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    cooperator_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        cooperator_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    cooperator_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        cooperator_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
      relations: ['user'],
    });

    return appointments;
  }

  public async create({
    cooperator_id,
    user_id,
    date,
  }: ICraeteAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      cooperator_id,
      user_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
