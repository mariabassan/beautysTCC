import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '../../../services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(req: any, res: Response): Promise<Response> {
    const { cooperator_id } = req.params;
    const { day, month, year } = req.query;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointments.execute({
      cooperator_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return res.json(appointments);
  }
}
