import { injectable, inject } from 'tsyringe';

import IEstablishmentRepository from '@modules/establishment/repositories/IEstablishmentRepository';
//import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Establishment from '../infra/typeorm/entities/Establishment';

interface IRequest {
  establishment_id: string;
}

@injectable()
class ListEstablishmentsService {
  constructor(
    @inject('EstablishmentRepository')
    private establishmentRepository: IEstablishmentRepository,
  ) {}

public async execute({
  establishment_id,
}: IRequest): Promise<Establishment[]> {
  const establishment = await this.establishmentRepository.findAllEstablishment(
    {
      establishment_id,
    },
  );

  return establishment;
}
}

export default ListEstablishmentsService;
