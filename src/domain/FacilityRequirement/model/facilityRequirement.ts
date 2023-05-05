import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('FacilityRequirement')
export class FacilityRequirement extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
  })
  facility_id: string;

  @Column({
    nullable: false,
  })
  document_id: boolean;
}
