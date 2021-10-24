import Establishment from '@modules/establishment/infra/typeorm/entities/Establishment';
import ICreateEstablishmentDTO from '@modules/establishment/dtos/ICreateEstablishmentDTO';
import IFindAllEstablishmentDTO from '@modules/establishment/dtos/IFindAllEstablishmentDTO';

export default interface IEstablishmentepository {
  findAllEstablishment(data: IFindAllEstablishmentDTO): Promise<Establishment[]>;
  //findById(id: string): Promise<Establishment | undefined>;
  //findByCNPJ(cnpj: string): Promise<Establishment | undefined>;
  create(data: ICreateEstablishmentDTO): Promise<Establishment>;
  save(name: Establishment): Promise<Establishment>;
}
