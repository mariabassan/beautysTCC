import { getRepository, Repository, Raw, Not} from 'typeorm';

import ICreateAppointmentDTO from '../../../dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../../../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../../../dtos/IFindAllInDayFromProviderDTO';
import IFindByDateDTO from '../../../dtos/IFindByDateDTO';
import IFindAllInDayFromUserDTO from '../../../dtos/IFindAllInDayFromUserDTO';
import IFindAllAppointmentsDTO from '../../../dtos/IFindAllAppointmentsDTO';

import IAppointmentsRepository from '../../../repositories/IAppointmentsRepository';

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
      //relations: ['user'],
    });

    return appointments;
  }

  public async findAllInDayFromUser({
    user_id,
    day,
    month,
    year,
  }: IFindAllInDayFromUserDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        user_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
      //relations: ['user'],
    });

    return appointments;
  }

  public async findAllAppointments({
    execept_user_id,
    day,
    month,
    year,
  }: IFindAllAppointmentsDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');
    let appointments: Appointment[];

    if (execept_user_id) {
      appointments = await this.ormRepository.find({
        where: {
          id: Not(execept_user_id),
          date: Raw(
            dateFieldName =>
              `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
          ),
        },
      });
    } else {
      appointments = await this.ormRepository.find();
    }

    return appointments;
  }

  /*deleteFromClient(user_id: string): Promise<Appointment | undefined> {
    throw new Error('Method not implemented.');
  }*/

  public async create({
    cooperator_id,
    user_id,
    procedure_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      cooperator_id,
      user_id,
      procedure_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }


}

export default AppointmentsRepository;
