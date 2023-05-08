import { IsNumber, IsOptional, IsString } from 'class-validator';
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

  @IsString()
  @Type(() => String)
  shiftStart: string;

  @IsString()
  @Type(() => String)
  shiftEnd: string;
}
