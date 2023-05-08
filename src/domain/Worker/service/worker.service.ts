import { Inject, Injectable } from '@nestjs/common';
import { WorkerRepository } from '../repository/worker.repository';

@Injectable()
export class WorkerService {
  constructor(
    @Inject(WorkerRepository) private workerRepository: WorkerRepository,
  ) {}
  public findAllWithPagination = async (
    pageParam?: string,
    limitParam?: string,
  ) => await this.workerRepository.findAllWithPagination(pageParam, limitParam);

  public findShiftsWithPagination = async (
    workerId: string,
    facilityId: string,
    shiftStart: string,
    shiftEnd: string,
    pageParam?: string,
    limitParam?: string,
  ): Promise<any> =>
    await this.workerRepository.findAvailableShiftWithPagination(
      workerId,
      facilityId,
      shiftStart,
      shiftEnd,
      pageParam,
      limitParam,
    );
}
