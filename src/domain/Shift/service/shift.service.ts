import { Inject, Injectable } from '@nestjs/common';
import { ShiftRepository } from '../repository/shift.repository';

@Injectable()
export class ShiftService {
  constructor(
    @Inject(ShiftRepository) private shiftRepository: ShiftRepository,
  ) {}

  public findAllWithPagination = async (
    pageParam?: string,
    limitParam?: string,
  ) => await this.shiftRepository.findAllWithPagination(pageParam, limitParam);
}
