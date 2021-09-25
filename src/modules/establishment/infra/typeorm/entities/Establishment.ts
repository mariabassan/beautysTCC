import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

//import { Exclude, Expose } from 'class-transformer';

@Entity('establishment')
class Establishment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cnpj: string;

  @Column()
  nomeFantasia: string;

  @CreateDateColumn()
  razaoSocial: string;

  @Column()
  phone: string;

  @Column()
  cep: string;

  @Column()
  endereco: string;

  @Column()
  numero: number;

  @Column()
  cidade: string;

  @Column()
  uf: string;

  @Column()
  ramo: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Establishment;