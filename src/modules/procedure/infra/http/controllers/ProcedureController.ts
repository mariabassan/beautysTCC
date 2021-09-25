import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateProcedureService from '../../../services/CreateProcedureService';

export default class ProcedureController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, valor, duracao } = req.body;

    const createProcedure = container.resolve(CreateProcedureService);

    const procedure = await createProcedure.execute({ name, valor, duracao });

    return res.json(classToClass(procedure));
  }
}
