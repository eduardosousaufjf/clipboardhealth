import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Shift')
export class Shift extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'timestamp',
    nullable: false,
    name: 'start',
  })
  start: boolean;

  @Column({
    type: 'timestamp',
    nullable: false,
    name: 'end',
  })
  end: boolean;

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
}
