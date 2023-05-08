import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { GetWorkersQueryParams } from '../dto/get-workers-query-params';
import { WorkerService } from '../service/worker.service';
import { Response } from 'express';
import { GetWorkersShiftQueryParams } from '../dto/get-workers-shift-query-params';

@Controller('/worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Get('/')
  async getWorkers(
    @Res() res: Response,
    @Query() queryParams: GetWorkersQueryParams,
  ): Promise<void> {
    const { page, limit } = queryParams;
    const workers = await this.workerService.findAllWithPagination(page, limit);
    res.status(200).send(workers);
  }

  @Get('/:id/shifts')
  async getShiftsForWorker(
    @Param('id') workerId: string,
    @Query() queryParams: GetWorkersShiftQueryParams,
  ): Promise<void> {
    const { page, limit, facilityId, shiftStart, shiftEnd } = queryParams;
    return await this.workerService.findShiftsWithPagination(
      workerId,
      facilityId,
      shiftStart,
      shiftEnd,
      page,
      limit,
    );
  }
}
