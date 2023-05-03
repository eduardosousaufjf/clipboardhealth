import { Controller, Get, Query, Res } from '@nestjs/common';
import { GetWorkersQueryParams } from '../dto/get-workers-query-params';
import { WorkerService } from '../service/worker.service';
import { Response } from 'express';

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
}
