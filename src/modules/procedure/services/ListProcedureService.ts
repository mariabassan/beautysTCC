import { injectable, inject } from 'tsyringe';

import IProcedureRepository from '@modules/procedure/repositories/IProcedureRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Procedure from '../infra/typeorm/entities/Procedure';

interface IRequest {
  procedure_id: string;
}

@injectable()
class ListProcedureService {
  constructor(
    @inject('ProcedureRepository')
    private procedureRepository: IProcedureRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ procedure_id }: IRequest): Promise<Procedure[]> {
    let procedures = await this.cacheProvider.recover<Procedure[]>(
      `providers-list:${procedure_id}`,
    );

    if (!procedures) {
      procedures = await this.procedureRepository.findAllProcedure({
        id: procedure_id,
      });

      await this.cacheProvider.save(`providers-list:${procedure_id}`, procedures);
    }

    return procedures;
  }
}

export default ListProcedureService;
