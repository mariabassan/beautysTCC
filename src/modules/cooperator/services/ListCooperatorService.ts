import { injectable, inject } from 'tsyringe';

import ICooperatorRepository from '@modules/cooperator/repositories/ICooperatorRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Cooperator from '../infra/typeorm/entities/Cooperator';

interface IRequest {
  cooperator_id: string;
}

@injectable()
class ListCooperatorService {
  constructor(
    @inject('CooperatorRepository')
    private cooperatorRepository: ICooperatorRepository,
  ) {}

  public async execute({
    cooperator_id,
  }: IRequest): Promise<Cooperator[]> {
    const cooperator = await this.cooperatorRepository.findAllCooperator(
      {
        cooperator_id,
      },
    );

    return cooperator;
  }
}
export default ListCooperatorService;
