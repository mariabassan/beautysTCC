import { isBefore, subHours, format} from 'date-fns';
import { injectable, inject } from 'tsyringe';
//import path from 'path';

import AppError from '../../../shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppoitmentsRepository from '../repositories/IAppointmentsRepository';
import ICacheProvider from '../../../shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationsRepository from '../../../modules/notifications/repositories/INotificationsRepository';
import IMailProvider from '../../../shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
  cooperator_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CancelAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppoitmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    /*@inject('MailProvider')
    private mailProvider: IMailProvider,*/
  ) {}

  public async run({ 
    cooperator_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment>{

    const appointment = await this.appointmentsRepository.findAllFromClient(
      {
        user_id,
        date,
      },
    ); 

    const appointmentDate = subHours(appointment!.date, 24);

    if (isBefore(appointmentDate, new Date())) {
      throw new AppError('Só é possível cancelar agendamentos com 24 horas de antecedência.');
    }

    appointment!.canceled_at = new Date();

    await this.appointmentsRepository.save(appointment!);

    const dateFormated = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      recipient_id: user_id,
      content: `Foi cancelado o agendamento com o ${cooperator_id} para o dia ${dateFormated}.`,
    });

    await this.cacheProvider.invalidate(`user:${user_id}:appointments`);

    return appointment!;
  }
}

export default CancelAppointmentService;