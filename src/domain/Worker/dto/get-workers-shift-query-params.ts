import { IsISO8601, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
export class GetWorkersShiftQueryParams {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  page?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit?: number;

  @IsNumber()
  @Type(() => Number)
  facilityId: string;

  @IsISO8601()
  shiftStart: string;

  @IsISO8601()
  shiftEnd: string;
}
