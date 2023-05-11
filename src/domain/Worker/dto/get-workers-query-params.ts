import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
export class GetWorkersQueryParams {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  page?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit?: number;
}
