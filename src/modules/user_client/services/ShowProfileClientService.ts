import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IUsersClientRepository from '../repositories/IUsersClientRepository';

import User_client from '../infra/typeorm/entities/User_client';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileClientService {
  constructor(
    @inject('UsersClientRepository')
    private usersClientRepository: IUsersClientRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User_client> {
    const user_client = await this.usersClientRepository.findById(user_id);

    if (!user_client) {
      throw new AppError('Usuário não encontrado.');
    }

    return user_client;
  }
}

export default ShowProfileClientService;
