import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('DocumentWorker')
export class DocumentWorker extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
  })
  worker_id: string;

  @Column({
    nullable: false,
  })
  document_id: boolean;
}
