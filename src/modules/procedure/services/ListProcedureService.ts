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
  ) {}

public async execute({
  procedure_id,
}: IRequest): Promise<Procedure[]> {
  const procedures = await this.procedureRepository.findAllProcedure(
    {
      procedure_id,
    },
  );

  return procedures;
}
}

export default ListProcedureService;
