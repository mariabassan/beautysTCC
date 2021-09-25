import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
//import CooperatorRepository from '@modules/cooperator/infra/typeorm/repositories/CooperatorRepository';
import ICooperatorRepository from '@modules/cooperator/repositories/ICooperatorRepository';

import Cooperator from '@modules/cooperator/infra/typeorm/entities/Cooperator';

interface IRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
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

  async execute({ name, email, password, phone}: IRequest): Promise<Cooperator> {
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
    });

    await this.cacheProvider.invalidatePrefix('providers-list');

    return cooperator;
  }
}

export default CreateCooperatorService;
