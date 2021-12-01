import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '../../../services/CreateAppointmentService';
import CancelAppointmentService from '../../../services/CancelAppointmentService';

export default class AppointmentsController {
  public async create(req: any, res: Response): Promise<Response> {
    const user_id = req.user.id;
    //const useradmin_id = req.user.id;
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

  public async delete(req: any, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { cooperator_id, date } = req.body;

    const cancelAppointment = container.resolve(CancelAppointmentService);

    const appointment = await cancelAppointment.run({
      cooperator_id,
      user_id,
      date,
    });

    return res.json(appointment);
  }
}
