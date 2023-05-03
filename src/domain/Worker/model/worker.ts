import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
