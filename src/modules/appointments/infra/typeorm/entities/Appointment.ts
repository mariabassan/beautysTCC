import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '../../../../users/infra/typeorm/entities/User';
import User_client from '../../../../user_client/infra/typeorm/entities/User_client';
import Cooperator from '../../../../cooperator/infra/typeorm/entities/Cooperator';
import Procedure from '../../../../procedure/infra/typeorm/entities/Procedure';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cooperator_id: string;

  @ManyToOne(() => Cooperator)
  @JoinColumn({ name: 'cooperator_id' })
  provider: Cooperator;

  @Column()
  user_id: string;

  @ManyToOne(() => User_client)
  @JoinColumn({ name: 'user_id' })
  user: User_client;

  @Column()
  useradmin_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'useradmin_id' })
  useradmin: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  procedure_id: string;

  @ManyToOne(() => Procedure)
  @JoinColumn({ name: 'procedure_id' })
  procedure: Procedure;

  @CreateDateColumn()
  canceled_at: Date;
}

export default Appointment;
