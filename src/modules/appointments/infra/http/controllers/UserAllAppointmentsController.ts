import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUserAllAppointmentsService from '../../../services/ListUserAllAppointmentsService';

export default class UserAllAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listUserAllAppointments = container.resolve(
      ListUserAllAppointmentsService,
    );

    const appointments = await listUserAllAppointments.execute({
      user_id,
    });

    return res.json(appointments);
  }
}
