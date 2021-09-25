import { injectable, inject } from 'tsyringe';

import IEstablishmentRepository from '@modules/establishment/repositories/IEstablishmentRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Establishment from '../infra/typeorm/entities/Establishment';

interface IRequest {
  establishment_id: string;
}

@injectable()
class ListEstablishmentsService {
  constructor(
    @inject('EstablishmentRepository')
    private establishmentRepository: IEstablishmentRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ establishment_id }: IRequest): Promise<Establishment[]> {
    let establishments = await this.cacheProvider.recover<Establishment[]>(
      `providers-list:${establishment_id}`,
    );

    if (!establishments) {
      establishments = await this.establishmentRepository.findAllEstablishment({
        id: establishment_id,
      });

      await this.cacheProvider.save(`providers-list:${establishment_id}`, establishments);
    }

    return establishments;
  }
}

export default ListEstablishmentsService;
