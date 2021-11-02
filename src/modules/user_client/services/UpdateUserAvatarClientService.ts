import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IUsersClientRepository from '../repositories/IUsersClientRepository';
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProviders';

import User_client from '../infra/typeorm/entities/User_client';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarClientService {
  constructor(
    @inject('UsersClientRepository')
    private usersClientRepository: IUsersClientRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User_client> {
    const user_client = await this.usersClientRepository.findById(user_id);

    if (!user_client) {
      throw new AppError('Somente usuários autenticados podem alterar o avatar.', 401);
    }

    if (user_client.avatar) {
      await this.storageProvider.deleteFile(user_client.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFilename);

    user_client.avatar = fileName;

    await this.usersClientRepository.save(user_client);

    return user_client;
  }
}

export default UpdateUserAvatarClientService;
