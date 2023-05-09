import { Controller, Get, Query } from '@nestjs/common';
import { ShiftService } from '../service/shift.service';
import { GetShiftQueryParams } from '../dto/get-shift-query-params';
import { Shift } from '../model/shift';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('/shift')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Get('/')
  @ApiOperation({ summary: 'Retrieve shifts' })
  @ApiResponse({
    status: 200,
    description: 'Returns all the shifts',
  })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 1 })
  async getShifts(
    @Query() queryParams: GetShiftQueryParams,
  ): Promise<{ shifts: Shift[] }> {
    const { page, limit } = queryParams;
    return await this.shiftService.findAllWithPagination(page, limit);
  }
}
