import { getRepository, Repository, Not } from 'typeorm';

import IUsersClientRepository from '../../../repositories/IUsersClientRepository';
import ICreateUserClientDTO from '../../../dtos/ICreateUserClientDTO';
import IFindAllProvidersClientDTO from '../../../dtos/IFindAllProvidersClientDTO';
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

  public async findAllProviders({
    execept_user_id,
  }: IFindAllProvidersClientDTO): Promise<User_client[]> {
    let users_client: User_client[];

    if (execept_user_id) {
      users_client = await this.ormRepository.find({
        where: {
          id: Not(execept_user_id),
        },
      });
    } else {
      users_client = await this.ormRepository.find();
    }

    return users_client;
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
