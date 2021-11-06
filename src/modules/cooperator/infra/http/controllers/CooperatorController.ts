import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCooperatorService from '../../../services/CreateCooperatorService';

export default class CooperatorsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, phone, procedure_id, estab_id } = req.body;

    const createCooperator = container.resolve(CreateCooperatorService);

    const cooperator = await createCooperator.execute({ name, email, password, phone, procedure_id ,estab_id });

    return res.json(classToClass(cooperator));
  }
}
