import { getRepository, Repository } from 'typeorm';

import IUserTokensClientRepository from '../../../repositories/IUserTokensClientRepository';

import UserToken_client from '../entities/UserToken_client';

class UserTokensClientRepository implements IUserTokensClientRepository {
  private ormRepository: Repository<UserToken_client>;

  constructor() {
    this.ormRepository = getRepository(UserToken_client);
  }

  public async findByToken(token: string): Promise<UserToken_client | undefined> {
    const userToken_client = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken_client;
  }

  public async generate(user_id: string): Promise<UserToken_client> {
    const userToken_client = this.ormRepository.create({ user_id });

    await this.ormRepository.save(userToken_client);

    return userToken_client;
  }
}

export default UserTokensClientRepository;
