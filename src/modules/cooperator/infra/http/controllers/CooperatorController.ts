import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCooperatorService from '../../../services/CreateCooperatorService';

export default class CooperatorsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const estab_id = req.user.id;
    const { name, email, password, phone } = req.body;

    const createCooeperator = container.resolve(CreateCooperatorService);

    const cooperator = await createCooeperator.execute({ name, email, password, phone, estab_id });

    return res.json(classToClass(cooperator));
  }
}
