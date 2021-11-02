import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '../../../shared/errors/AppError';
import IUsersClientRepository from '../repositories/IUsersClientRepository';
import IUserTokensClientRepository from '../repositories/IUserTokensClientRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordClientService {
  constructor(
    @inject('UsersClientRepository')
    private usersClientRepository: IUsersClientRepository,

    @inject('UserTokensClientRepository')
    private userTokensClientRepository: IUserTokensClientRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken_client = await this.userTokensClientRepository.findByToken(token);

    if (!userToken_client) {
      throw new AppError('User token não existe');
    }

    const user_client = await this.usersClientRepository.findById(userToken_client.user_id);

    if (!user_client) {
      throw new AppError('Usuário não existe');
    }

    const tokenCraetedAt = userToken_client.created_at;
    const compareDate = addHours(tokenCraetedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado');
    }

    user_client.password = await this.hashProvider.generateHash(password);

    await this.usersClientRepository.save(user_client);
  }
}

export default ResetPasswordClientService;
