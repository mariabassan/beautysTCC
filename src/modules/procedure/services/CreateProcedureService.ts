import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IProcedureRepository from '@modules/procedure/repositories/IProcedureRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
//import ProcedureRepository from '@modules/procedure/infra/typeorm/repositories/ProcedureRepository'

import Procedure from '@modules/procedure/infra/typeorm/entities/Procedure';

interface IRequest {
  name: string;
  valor: string;
  duracao: string;
}

@injectable()
class CreateProcedureService {
  constructor(
    @inject('ProcedureRepository')
    private procedureRepository: IProcedureRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({ name, valor, duracao }: IRequest): Promise<Procedure> {
    /*const checkProcedureExists = await this.proceduresRepository.findByName(name);

    if (checkProcedureExists) {
      throw new AppError('Name address already used.');
    }*/

    const procedure = await this.procedureRepository.create({
      name,
      valor,
      duracao,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');

    return procedure;
  }
}

export default CreateProcedureService;