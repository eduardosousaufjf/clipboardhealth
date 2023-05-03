import { Module } from '@nestjs/common';
import { WorkerController } from './controller/worker.controller';
import { WorkerService } from './service/worker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../commons/custom-repository/typeorm-ex.module';
import { WorkerRepository } from './repository/worker.repository';
import { Worker } from './model/worker';

export const workerModuleMetadata = {
  imports: [
    TypeOrmModule.forFeature([Worker]),
    TypeOrmExModule.forCustomRepository([WorkerRepository]),
  ],
  providers: [WorkerService],
  controllers: [WorkerController],
};

@Module(workerModuleMetadata)
export class WorkerModule {}
