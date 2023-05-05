import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Document } from '../../Document/model/document';
import { Shift } from '../../Shift/model/shift';

@Entity('Worker')
export class Worker extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  is_active: boolean;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  profession: string;

  @ManyToMany(() => Document)
  @JoinTable({
    name: 'DocumentWorker',
    joinColumn: {
      name: 'document_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'worker_id',
      referencedColumnName: 'id',
    },
  })
  documents: Document[];

  @OneToMany(() => Shift, (shift) => shift.worker)
  shifts: Shift[];
}
