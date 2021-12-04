import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUserAllAppointmentsService from '../../../services/ListUserAllAppointmentsService';

export default class UserAllAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { year } = req.query;

    const listUserAllAppointments = container.resolve(
      ListUserAllAppointmentsService,
    );

    const appointments = await listUserAllAppointments.execute({
      user_id,
      year: Number(year),
    });

    return res.json(appointments);
  }
}
