import { Controller, Get, Query } from '@nestjs/common';
import { ShiftService } from '../service/shift.service';
import { GetShiftQueryParams } from '../dto/get-shift-query-params';
import { Shift } from '../model/shift';

@Controller('/shift')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Get('/')
  async getShifts(
    @Query() queryParams: GetShiftQueryParams,
  ): Promise<{ shifts: Shift[] }> {
    const { page, limit } = queryParams;
    return await this.shiftService.findAllWithPagination(page, limit);
  }
}
