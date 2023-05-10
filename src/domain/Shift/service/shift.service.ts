import { Inject, Injectable } from '@nestjs/common';
import { ShiftRepository } from '../repository/shift.repository';
import { Shift } from '../model/shift';

@Injectable()
export class ShiftService {
  constructor(
    @Inject(ShiftRepository) private shiftRepository: ShiftRepository,
  ) {}

  public findAllWithPagination = async (
    pageParam?: number,
    limitParam?: number,
  ): Promise<{ shifts: Shift[] }> =>
    await this.shiftRepository.findAllWithPagination(pageParam, limitParam);
}
