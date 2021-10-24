import { getRepository, Repository, Not} from 'typeorm';

import ICreateCooperatorDTO from '../../../dtos/ICreateCooperatorDTO';
import IFindAllCooperatorDTO from '../../../dtos/IFindAllCooperatorDTO';

//import IEstablishmentRepository from '@modules/establishment/repositories/IEstablishmentRepository';
// import ICooperatorRepository from '@modules/cooperator/infra/typeorm/repositories/CooperatorRepository';

import Cooperator from '../entities/Cooperator';

class CooperatorRepository {
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

  save(name: Cooperator): Promise<Cooperator> {
    throw new Error('Method not implemented.');
  }

  public async findByName({
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
    phone
  }: ICreateCooperatorDTO): Promise<Cooperator> {
    const Cooperator = this.ormRepository.create({
      name,
      email, 
      password,
      phone
    });

    await this.ormRepository.save(Cooperator);

    return Cooperator;
  }
}

export default CooperatorRepository;
