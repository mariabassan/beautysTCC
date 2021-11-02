import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IUsersClientRepository from '../repositories/IUsersClientRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User_client from '../infra/typeorm/entities/User_client';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileClientService {
  constructor(
    @inject('UsersClientRepository')
    private usersClientRepository: IUsersClientRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User_client> {
    const user_client = await this.usersClientRepository.findById(user_id);

    if (!user_client) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await this.usersClientRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use');
    }

    Object.assign(user_client, { name, email });

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.comapreHash(
        old_password,
        user_client.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      user_client.password = await this.hashProvider.generateHash(password);
    }

    return this.usersClientRepository.save(user_client);
  }
}

export default UpdateProfileClientService;
