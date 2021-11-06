import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAppointmentsService from '../../../services/ListAppointmentsService';

export default class ListAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { day, month, year } = req.query;

    const listAppointments = container.resolve(
      ListAppointmentsService,
    );

    const appointments = await listAppointments.execute({
      user_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return res.json(appointments);
  }
}
