import { IsNumber, IsOptional } from 'class-validator';
export class GetWorkersQueryParams {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;
}
