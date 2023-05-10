import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetShiftQueryParams {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit?: number;
}
