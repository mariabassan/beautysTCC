import { injectable, inject } from 'tsyringe';

import ICooperatorRepository from '@modules/cooperator/repositories/ICooperatorRepository';
import Cooperator from '@modules/cooperator/infra/typeorm/entities/Cooperator';

interface IRequest {
  cooperator_id: string;
  estab_cnpj:string;
}

@injectable()
class ListCooperatorEstabService {
  constructor(
    @inject('CooperatorRepository')
    private cooperatorRepository: ICooperatorRepository,
  ) {}

  public async execute({
    cooperator_id,
    estab_cnpj
  }: IRequest): Promise<Cooperator[]> {
    const cooperator = await this.cooperatorRepository.findByEstab(
      {
        cooperator_id,
        estab_cnpj
      },
    );

    return cooperator;
  }
}

export default ListCooperatorEstabService;
