import User_client from '../infra/typeorm/entities/User_client';
import ICreateUserClientDTO from '../dtos/ICreateUserClientDTO';
import IFindAllProvidersClientDTO from '../dtos/IFindAllProvidersClientDTO';

export default interface IUsersClientRepository {
  findAllProviders(data: IFindAllProvidersClientDTO): Promise<User_client[]>;
  findById(id: string): Promise<User_client | undefined>;
  findByEmail(email: string): Promise<User_client | undefined>;
  create(data: ICreateUserClientDTO): Promise<User_client>;
  save(user: User_client): Promise<User_client>;
}
