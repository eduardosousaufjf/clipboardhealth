import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Facility } from '../../Facility/model/facility';
import { Worker } from '../../Worker/model/worker';
@Entity('Shift')
export class Shift extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * When the shift starts, ISO 8601 string
   * @example '2023-02-13T21:00:00.411Z'
   */
  @Column({
    type: 'timestamp',
    nullable: false,
    name: 'start',
  })
  start: string;

  /**
   * When the shift ends, ISO 8601 string
   * @example '2023-02-13T21:00:00.411Z'
   */
  @Column({
    type: 'timestamp',
    nullable: false,
    name: 'end',
  })
  end: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  profession: string;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  is_deleted: boolean;

  @Column({
    nullable: false,
  })
  facility_id: number;

  @Column({
    nullable: false,
  })
  worker_id: number;

  @OneToMany(() => Facility, (facility) => facility.shifts)
  @JoinColumn({ name: 'facility_id' })
  facility: Facility;

  @ManyToOne(() => Worker, (worker) => worker.shifts)
  @JoinColumn({ name: 'worker_id' })
  worker: Worker;
}
