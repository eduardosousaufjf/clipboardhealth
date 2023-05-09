import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { GetWorkersQueryParams } from '../dto/get-workers-query-params';
import { WorkerService } from '../service/worker.service';
import { Response } from 'express';
import { GetWorkersShiftQueryParams } from '../dto/get-workers-shift-query-params';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('/worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Get('/')
  @ApiOperation({ summary: 'Retrieve workers' })
  @ApiResponse({
    status: 200,
    description: 'Returns all the workers',
  })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 1 })
  async getWorkers(
    @Res() res: Response,
    @Query() queryParams: GetWorkersQueryParams,
  ): Promise<void> {
    const { page, limit } = queryParams;
    const workers = await this.workerService.findAllWithPagination(page, limit);
    res.status(200).send(workers);
  }

  @Get('/:id/shifts')
  @ApiOperation({
    summary:
      'Retrieve available shifts for a given worker in a given facility and period',
  })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 1 })
  @ApiQuery({
    name: 'facilityId',
    required: true,
    example: 1,
  })
  @ApiQuery({
    name: 'shiftStart',
    required: true,
    example: '2023-02-08T14:04:56.598Z',
    description:
      'ISO8601 string representing the minimum date when a shift needs to start ',
  })
  @ApiQuery({
    name: 'shiftEnd',
    required: true,
    example: '2023-02-08T14:04:56.598Z',
    description:
      'ISO8601 string representing the maximum date when a shift needs to end ',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all the shifts',
  })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 1 })
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
