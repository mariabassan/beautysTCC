import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCooperatorEstabService from '../../../services/ListCooperatorEstabService';

export default class ListCooperatorEstabController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { cooperator_id, estab_cnpj } = req.params;

    const listCooperatorEstab = container.resolve(
      ListCooperatorEstabService,
    );

    const cooperator = await listCooperatorEstab.execute({
      cooperator_id,
      estab_cnpj
    });

    return res.json(cooperator);
  }
}


