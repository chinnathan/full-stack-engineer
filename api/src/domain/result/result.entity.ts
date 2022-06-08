import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { SSRStatus } from '../../constant';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: SSRStatus,
    default: SSRStatus.QUEUED,
  })
  status: SSRStatus;

  @Column({ type: 'varchar', length: 128 })
  repositoryName: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  findings: Array<{ id: string }>;

  @CreateDateColumn({ type: 'timestamp' })
  queuedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  scanningAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  finishedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
