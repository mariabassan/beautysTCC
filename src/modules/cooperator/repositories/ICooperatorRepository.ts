import Cooperator from '@modules/cooperator/infra/typeorm/entities/Cooperator';
import ICreateCooperatorDTO from '@modules/cooperator/dtos/ICreateCooperatorDTO';
import IFindAllCooperatorDTO from '@modules/cooperator/dtos/IFindAllCooperatorDTO';
import IFindAllCooperatorEstabDTO from '@modules/cooperator/dtos/IFindAllCooperatorEstabDTO';

export default interface ICooperatorRepository {
  findAllCooperator(data: IFindAllCooperatorDTO): Promise<Cooperator[]>;
  findByEmail(email: string): Promise<Cooperator | undefined>;
  findByEstab(estab_cnpj: IFindAllCooperatorEstabDTO): Promise<Cooperator[]>;
  create(data: ICreateCooperatorDTO): Promise<Cooperator>;
  save(name: Cooperator): Promise<Cooperator>;
}
