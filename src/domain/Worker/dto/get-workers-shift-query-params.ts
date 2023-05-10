import { IsISO8601, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
export class GetWorkersShiftQueryParams {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  page?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit?: string;

  @IsNumber()
  @Type(() => Number)
  facilityId: string;

  @IsISO8601()
  shiftStart: string;

  @IsISO8601()
  shiftEnd: string;
}
