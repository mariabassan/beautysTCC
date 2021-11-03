import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import ICacheProvider from '../../../shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersClientRepository from '../repositories/IUsersClientRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
//import UsersClientRepository from '../infra/typeorm/repositories/UsersClientRepository';

import User_client from '../infra/typeorm/entities/User_client';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserClientService {
  constructor(
    @inject('UsersClientRepository')
    private usersClientRepository: IUsersClientRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({ name, email, password }: IRequest): Promise<User_client> {
    const checkUserExists = await this.usersClientRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user_client = await this.usersClientRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');

    return user_client;
  }
}

export default CreateUserClientService;
