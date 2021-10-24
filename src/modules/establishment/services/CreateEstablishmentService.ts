import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '../../../shared/container/providers/CacheProvider/models/ICacheProvider';
import EstablishmentRepository from '../infra/typeorm/repositories/EstablishmentRepository';
import IHashProvider from '../../users/providers/HashProvider/models/IHashProvider';
import IEstablishmentRepository from '@modules/establishment/repositories/IEstablishmentRepository';

//import IUsersRepository from '@modules/users/repositories/IUsersRepository';
//import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';


import Establishment from '../infra/typeorm/entities/Establishment';

interface IRequest {
  cnpj: string;
  nomeFantasia: string;
  razaoSocial: string;
  phone: string;
  cep: string;
  endereco: string;
  cidade: string;
  uf: string;
  favorite: boolean;
  //token: string;
}

@injectable()
class CreateEstablishmentService {
  constructor(
    @inject('EstablishmentRepository')
    private establishmentRepository: EstablishmentRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({cnpj, nomeFantasia, razaoSocial,phone,cep,endereco,cidade,uf,favorite}: IRequest): Promise<Establishment> {


    /*const checkEstablishmentExists = await this.establishmentRepository.findByCNPJ(cnpj);

    if (checkEstablishmentExists) {
      throw new AppError('CNPJ já está em uso.');
    }*/

    const establishment = await this.establishmentRepository.create({
      cnpj, nomeFantasia,razaoSocial,phone,cep,endereco,cidade,uf,favorite
    });

    await this.cacheProvider.invalidatePrefix('providers-list');

    return establishment;
  }
}

export default CreateEstablishmentService;
