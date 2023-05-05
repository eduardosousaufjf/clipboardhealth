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

@Entity('Facility')
export class Facility extends BaseEntity {
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

  @ManyToMany(() => Document)
  @JoinTable({
    name: 'FacilityRequirement',
    joinColumn: {
      name: 'facility_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'document_id',
      referencedColumnName: 'id',
    },
  })
  documents: Document[];

  @OneToMany(() => Shift, (shift) => shift.facility)
  shifts: Shift[];
}
