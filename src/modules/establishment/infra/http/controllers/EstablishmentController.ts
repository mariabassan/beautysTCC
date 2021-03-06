import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEstablishmentService from '../../../services/CreateEstablishmentService';

export default class EstablishmentController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { cnpj,
            nomeFantasia,
            razaoSocial,
            phone,
            cep,
            endereco,
            cidade,
            uf,
            favorite} = req.body;

    const createEstablishment = container.resolve(CreateEstablishmentService);

    const establishment = await createEstablishment.execute({ cnpj,
                                                              nomeFantasia,
                                                              razaoSocial,
                                                              phone,
                                                              cep,
                                                              endereco,
                                                              cidade,
                                                              uf,
                                                              favorite });

    return res.json(classToClass(establishment));
  }
}
