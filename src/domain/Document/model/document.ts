import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Facility } from '../../Facility/model/facility';

@Entity('Document')
export class Document extends BaseEntity {
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

  @ManyToMany(() => Facility)
  @JoinTable({
    name: 'FacilityRequirement',
    joinColumn: {
      name: 'document_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'facility_id',
      referencedColumnName: 'id',
    },
  })
  facilities: Facility[];
}
