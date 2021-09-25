import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import ListProcedureService from '../../../services/ListProcedureService';

import Procedure from '../../typeorm/entities/Procedure';

export default class ListProcedureController {
  public async index(req: any, res: Response): Promise<Response> {
    const procedure_id = req.user.id;

    const listProcedure = container.resolve(ListProcedureService);

    const procedure = await listProcedure.execute({ procedure_id });

    return res.json(classToClass(plainToClass(Procedure, procedure)));
  }
}
