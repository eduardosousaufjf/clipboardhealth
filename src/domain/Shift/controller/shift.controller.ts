import { Controller, Get, Query, Res } from '@nestjs/common';
import { ShiftService } from '../service/shift.service';
import { GetShiftQueryParams } from '../dto/get-shift-query-params';
import { Response } from 'express';
@Controller('/shift')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Get('/')
  async getShifts(
    @Res() res: Response,
    @Query() queryParams: GetShiftQueryParams,
  ): Promise<void> {
    const { page, limit } = queryParams;
    const shifts = await this.shiftService.findAllWithPagination(page, limit);
    res.status(200).send(shifts);
  }
}
