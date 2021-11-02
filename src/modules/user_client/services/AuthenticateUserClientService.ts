import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IUsersClientRepository from '../repositories/IUsersClientRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import authConfig from '../../../config/auth';
import User_client from '../infra/typeorm/entities/User_client';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user_client: User_client;
  token: string;
}

@injectable()
export default class AuthenticateUserClientService {
  constructor(
    @inject('UsersClientRepository')
    private usersClientRepository: IUsersClientRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user_client = await this.usersClientRepository.findByEmail(email);

    if (!user_client) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.comapreHash(
      password,
      user_client.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user_client.id,
      expiresIn:43200000000,
    });

    return {
      user_client,
      token,
    };
  }
}
