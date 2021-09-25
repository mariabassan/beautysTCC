import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import ListCooperatorService from '../../../services/ListCooperatorService';

import Cooperator from '../../typeorm/entities/Cooperator';

export default class ListCooperatorController {
  public async index(req: Request, res: Response): Promise<Response> {
    const {cooperator_id} = req.params;

    const listCooperator = container.resolve(ListCooperatorService);

    const cooperator = await listCooperator.execute({ cooperator_id });

    return res.json(classToClass(plainToClass(Cooperator, cooperator)));
  }
}
