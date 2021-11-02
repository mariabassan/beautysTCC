import { getRepository, Repository, Not } from 'typeorm';

import IUsersClientRepository from '../../../repositories/IUsersClientRepository';
import ICreateUserClientDTO from '../../../dtos/ICreateUserClientDTO';
import User_client from '../entities/User_client';

class UsersClientRepository implements IUsersClientRepository {
  private ormRepository: Repository<User_client>;

  constructor() {
    this.ormRepository = getRepository(User_client);
  }

  public async findById(id: string): Promise<User_client | undefined> {
    const user_client = await this.ormRepository.findOne(id);

    return user_client;
  }

  public async findByEmail(email: string): Promise<User_client | undefined> {
    const user_client = await this.ormRepository.findOne({ where: { email } });

    return user_client;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserClientDTO): Promise<User_client> {
    const user_client = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user_client);

    return user_client;
  }

  public async save(user_client: User_client): Promise<User_client> {
    return this.ormRepository.save(user_client);
  }
}

export default UsersClientRepository;
