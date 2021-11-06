import { getRepository, Repository, Not} from 'typeorm';

import ICreateCooperatorDTO from '../../../dtos/ICreateCooperatorDTO';
import IFindAllCooperatorDTO from '../../../dtos/IFindAllCooperatorDTO';
import IFindAllCooperatorEstabDTO from '../../../dtos/IFindAllCooperatorEstabDTO';

//import IEstablishmentRepository from '@modules/establishment/repositories/IEstablishmentRepository';
import ICooperatorRepository from '../../../infra/typeorm/repositories/CooperatorRepository';

import Cooperator from '../entities/Cooperator';

class CooperatorRepository implements ICooperatorRepository {
  private ormRepository: Repository<Cooperator>;

  constructor() {
    this.ormRepository = getRepository(Cooperator);
  }
  /*findByCNPJ(cnpj: string): Promise<Establishment | undefined> {
    throw new Error('Method not implemented.');
  }*/
  public async findAllCooperator({
    cooperator_id,
  }: IFindAllCooperatorDTO): Promise<Cooperator[]> {
    let cooperator: Cooperator[];

    if (cooperator_id) {
      cooperator = await this.ormRepository.find({
        where: {
          id: Not(cooperator_id),
        },
      });
    } else {
      cooperator = await this.ormRepository.find();
    }

    return cooperator;
  }

  public async findAllCooperatorEstab({
    cooperator_id,
    estab_id
  }: IFindAllCooperatorEstabDTO): Promise<Cooperator[]> {
    let cooperators: Cooperator[];

    if (cooperator_id) {
      cooperators = await this.ormRepository.find({
        where: {
          estab: (estab_id),
        },
      });
    } else {
      cooperators = await this.ormRepository.find();
    }

    return cooperators;
  }

  save(name: Cooperator): Promise<Cooperator> {
    throw new Error('Method not implemented.');
  }

  public async findByIdCoop({
    cooperator_id
  }: IFindAllCooperatorDTO): Promise<Cooperator | undefined> {
    const findCooperator = await this.ormRepository.findOne({
      where: { cooperator_id },
    });
    return findCooperator;
  }

  public async create({
    name,
    email, 
    password,
    phone,
    procedure_id,
    estab_id
  }: ICreateCooperatorDTO): Promise<Cooperator> {
    const Cooperator = this.ormRepository.create({
      name,
      email, 
      password,
      phone,
      procedure_id,
      estab_id
    });

    await this.ormRepository.save(Cooperator);

    return Cooperator;
  }
}

export default CooperatorRepository;
