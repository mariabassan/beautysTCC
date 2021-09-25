import Procedure from '@modules/procedure/infra/typeorm/entities/Procedure';
import ICreateProcedureDTO from '@modules/procedure/dtos/ICreateProcedureDTO';
import IFindAllProcedureDTO from '@modules/procedure/dtos/IFindAllProcedureDTO';

export default interface IProcedureRepository {
  findAllProcedure(data: IFindAllProcedureDTO): Promise<Procedure[]>;
  //findById(id: string): Promise<Procedure | undefined>;
  create(data: ICreateProcedureDTO): Promise<Procedure>;
  save(name: Procedure): Promise<Procedure>;
}
