import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import ICacheProvider from '../../../shared/container/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '../../users/providers/HashProvider/models/IHashProvider';
//import CooperatorRepository from '@modules/cooperator/infra/typeorm/repositories/CooperatorRepository';
import ICooperatorRepository from '../repositories/ICooperatorRepository';

import Cooperator from '../infra/typeorm/entities/Cooperator';

interface IRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  procedure_id: string;
  estab_id: string;
}

@injectable()
class CreateCooperatorService {
  constructor(
    @inject('CooperatorRepository')
    private cooperatorRepository: ICooperatorRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({name, email, password, phone, procedure_id, estab_id}: IRequest): Promise<Cooperator> {
    /*const checkCooperatorExists = await this.cooperatorRepository.findByEmail(email);

    if (checkCooperatorExists) {
      throw new AppError('Email address already used.');
    }*/

    const hashedPassword = await this.hashProvider.generateHash(password);

    const cooperator = await this.cooperatorRepository.create({
      name,
      email,
      password: hashedPassword,
      phone,
      procedure_id,
      estab_id,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');

    return cooperator;
  }
}

export default CreateCooperatorService;
