import { getRepository, Repository, Not} from 'typeorm';

import ICreateProcedureDTO from '../../../dtos/ICreateProcedureDTO';
import IFindAllProcedureDTO from '../../../dtos/IFindAllProcedureDTO';

import IProcedureRepository from '../../../repositories/IProcedureRepository';

import Procedure from '../entities/Procedure';

class ProcedureRepository implements IProcedureRepository {
  private ormRepository: Repository<Procedure>;

  constructor() {
    this.ormRepository = getRepository(Procedure);
  }
  /*findAllProcedure(data: IFindAllProcedureDTO): Promise<Procedure[]> {
    throw new Error('Method not implemented.');
  }*/

  public async findAllProcedure({
    procedure_id,
  }: IFindAllProcedureDTO): Promise<Procedure[]> {
    let procedure: Procedure[];

    if (procedure_id) {
      procedure = await this.ormRepository.find({
        where: {
          id: Not(procedure_id),
        },
      });
    } else {
      procedure = await this.ormRepository.find();
    }

    return procedure;
  }

  save(name: Procedure): Promise<Procedure> {
    throw new Error('Method not implemented.');
  }

  public async findByName({
    procedure_id,
  }: IFindAllProcedureDTO): Promise<Procedure | undefined> {
    const findProcedure = await this.ormRepository.findOne({
      where: { procedure_id },
    });
    return findProcedure;
  }

  public async create({
    name,
    price,
  }: ICreateProcedureDTO): Promise<Procedure> {
    const Procedure = this.ormRepository.create({
      name,
      price
    });

    await this.ormRepository.save(Procedure);

    return Procedure;
  }
}

export default ProcedureRepository;
