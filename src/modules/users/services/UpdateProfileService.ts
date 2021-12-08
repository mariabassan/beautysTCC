import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('Esse e-mail já está em uso.');
    }

    Object.assign(user, { name, email });

    if (password && !old_password) {
      throw new AppError(
        'Você precisa informar a senha antiga para configurar uma nova.',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.comapreHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('A senha antiga não confere.');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
