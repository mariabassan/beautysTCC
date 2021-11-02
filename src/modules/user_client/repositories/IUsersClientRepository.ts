import User_client from '../infra/typeorm/entities/User_client';
import ICreateUserClientDTO from '../dtos/ICreateUserClientDTO';

export default interface IUsersClientRepository {
  findById(id: string): Promise<User_client | undefined>;
  findByEmail(email: string): Promise<User_client | undefined>;
  create(data: ICreateUserClientDTO): Promise<User_client>;
  save(user_client: User_client): Promise<User_client>;
}
