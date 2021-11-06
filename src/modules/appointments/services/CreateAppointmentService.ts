import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppoitmentsRepository from '../repositories/IAppointmentsRepository';
import ICacheProvider from '../../../shared/container/providers/CacheProvider/models/ICacheProvider';

import INotificationsRepository from '../../../modules/notifications/repositories/INotificationsRepository';


interface IRequest {
  cooperator_id: string;
  user_id: string;
  procedure_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppoitmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    cooperator_id,
    user_id,
    procedure_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("Não é possível criar um agendamento para uma data passada.");
    }

    if (user_id === cooperator_id) {
      throw new AppError("Não é permitido criar um agendamento para você mesmo.");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 18) {
      throw new AppError(
        'Os agendamentos só podem ser feitos entre 8am e 6pm.',
      );
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      {
        date: appointmentDate,
        cooperator_id,
      },
    );

    if (findAppointmentInSameDate) {
      throw new AppError('A data e hora escolhida já está ocupada.');
    }

    const appointment = await this.appointmentsRepository.create({
      cooperator_id,
      user_id,
      procedure_id,
      date: appointmentDate,
    });

    const dateFormated = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      recipient_id: user_id,
      content: `Novo agendamento com o ${cooperator_id} para o dia ${dateFormated}.`,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${cooperator_id}:${format(
        appointmentDate,
        'yyyy-M-d',
      )}`,
    );

    return appointment;
  }
}

export default CreateAppointmentService;
