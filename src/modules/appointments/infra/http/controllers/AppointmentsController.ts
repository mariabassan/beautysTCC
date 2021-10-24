import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '../../../services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(req: any, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { cooperator_id, procedure_id, date } = req.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      cooperator_id,
      user_id,
      procedure_id,
      date,
    });

    return res.json(appointment);
  }
}
