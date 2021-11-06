import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import Establishment from '@modules/establishment/infra/typeorm/entities/Establishment';
import Procedure from '@modules/procedure/infra/typeorm/entities/Procedure';
//import Procedures from '@modules/procedure/infra/typeorm/entities/Procedure';

@Entity('cooperator')
class Cooperator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  phone: string;

  @Column()
  procedure_id: string;

  @ManyToOne(() => Procedure)
  @JoinColumn({ name: 'procedure_id' })
  procedure: Procedure;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  estab_id: string;

  @ManyToOne(() => Establishment)
  @JoinColumn({ name: 'estab_id' })
  estab: Establishment;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    return this.avatar ?`${process.env.APP_API_URL}/files/${this.avatar}`:null;
  }
}

export default Cooperator;