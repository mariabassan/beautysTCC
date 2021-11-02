import UserToken_client from '../infra/typeorm/entities/UserToken_client';

export default interface IUserTokensClientRepository {
  generate(user_id: string): Promise<UserToken_client>;
  findByToken(token: string): Promise<UserToken_client | undefined>;
}
