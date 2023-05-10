import { Inject, Injectable } from '@nestjs/common';
import { WorkerRepository } from '../repository/worker.repository';
import { WorkerShiftsDto } from '../dto/worker-shifts-dto';
@Injectable()
export class WorkerService {
  constructor(
    @Inject(WorkerRepository) private workerRepository: WorkerRepository,
  ) {}
  public findAllWithPagination = async (
    pageParam?: number,
    limitParam?: number,
  ): Promise<WorkerShiftsDto> =>
    await this.workerRepository.findAllWithPagination(pageParam, limitParam);

  public findShiftsWithPagination = async (
    workerId: string,
    facilityId: string,
    shiftStart: string,
    shiftEnd: string,
    pageParam?: number,
    limitParam?: number,
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
