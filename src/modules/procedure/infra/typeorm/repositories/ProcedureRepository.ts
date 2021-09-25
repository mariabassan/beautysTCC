import { getRepository, Repository} from 'typeorm';

import ICreateProcedureDTO from '../../../dtos/ICreateProcedureDTO';
import IFindAllProcedureDTO from '../../../dtos/IFindAllProcedureDTO';

import IProcedureRepository from '../../../repositories/IProcedureRepository';

import Procedure from '../entities/Procedure';

class ProcedureRepository implements IProcedureRepository {
  private ormRepository: Repository<Procedure>;

  constructor() {
    this.ormRepository = getRepository(Procedure);
  }
  findAllProcedure(data: IFindAllProcedureDTO): Promise<Procedure[]> {
    throw new Error('Method not implemented.');
  }
  save(name: Procedure): Promise<Procedure> {
    throw new Error('Method not implemented.');
  }

  public async findByName({
    id,
    name,
  }: IFindAllProcedureDTO): Promise<Procedure | undefined> {
    const findProcedure = await this.ormRepository.findOne({
      where: { id, name },
    });
    return findProcedure;
  }

  public async create({
    name,
    valor,
    duracao
  }: ICreateProcedureDTO): Promise<Procedure> {
    const Procedure = this.ormRepository.create({
      name,
      valor,
      duracao
    });

    await this.ormRepository.save(Procedure);

    return Procedure;
  }
}

export default ProcedureRepository;
