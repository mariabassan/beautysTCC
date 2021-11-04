import Cooperator from '../infra/typeorm/entities/Cooperator';
import ICreateCooperatorDTO from '../dtos/ICreateCooperatorDTO';
import IFindAllCooperatorDTO from '../dtos/IFindAllCooperatorDTO';
import IFindAllCooperatorEstabDTO from '../dtos/IFindAllCooperatorEstabDTO';

export default interface ICooperatorRepository {
  findAllCooperator(data: IFindAllCooperatorDTO): Promise<Cooperator[]>;
  findByIdCoop(id: string): Promise<Cooperator | undefined>;
  findByEmail(email: string): Promise<Cooperator | undefined>;
  findByEstab(estab_id: IFindAllCooperatorEstabDTO): Promise<Cooperator[]>;
  create(data: ICreateCooperatorDTO): Promise<Cooperator>;
  save(name: Cooperator): Promise<Cooperator>;
}
