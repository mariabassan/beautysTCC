import { getRepository, Repository, Not} from 'typeorm';

import ICreateEstablishmentDTO from '../../../dtos/ICreateEstablishmentDTO';
import IFindAllEstablishmentDTO from '../../../dtos/IFindAllEstablishmentDTO';

//import IEstablishmentRepository from '@modules/establishment/repositories/IEstablishmentRepository';
import IEstablishmentRepository from '../../../repositories/IEstablishmentRepository';

import Establishment from '../entities/Establishment';

class EstablishmentRepository implements IEstablishmentRepository {
  private ormRepository: Repository<Establishment>;

  constructor() {
    this.ormRepository = getRepository(Establishment);
  }
  /*findByCNPJ(cnpj: string): Promise<Establishment | undefined> {
    throw new Error('Method not implemented.');
  }*/

  public async findAllEstablishment({
    establishment_id,
  }: IFindAllEstablishmentDTO): Promise<Establishment[]> {
    let establishment: Establishment[];

    if (establishment_id) {
      establishment = await this.ormRepository.find({
        where: {
          id: Not(establishment_id),
        },
      });
    } else {
      establishment = await this.ormRepository.find();
    }

    return establishment;
  }

  /*findAllEstablishment(data: IFindAllEstablishmentDTO): Promise<Establishment[]> {
    throw new Error('Method not implemented.');
  }*/

  save(name: Establishment): Promise<Establishment> {
    throw new Error('Method not implemented.');
  }

  public async findByName({
    establishment_id,
  }: IFindAllEstablishmentDTO): Promise<Establishment | undefined> {
    const findEstablishment = await this.ormRepository.findOne({
      where: { establishment_id },
    });
    return findEstablishment;
  }

  public async create({
    cnpj,
    nomeFantasia,
    razaoSocial,
    phone,
    cep,
    endereco,
    cidade,
    uf,
    favorite
  }: ICreateEstablishmentDTO): Promise<Establishment> {
    const Establishment = this.ormRepository.create({
      cnpj,
      nomeFantasia,
      razaoSocial,
      phone,
      cep,
      endereco,
      cidade,
      uf,
      favorite,
    });

    await this.ormRepository.save(Establishment);

    return Establishment;
  }
}

export default EstablishmentRepository;
