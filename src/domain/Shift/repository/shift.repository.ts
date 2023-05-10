import { CustomRepository } from '../../../commons/custom-repository/typeorm-ex.decorator';
import { Shift } from '../model/shift';
import { Repository } from 'typeorm';

@CustomRepository(Shift)
export class ShiftRepository extends Repository<Shift> {
  public async findAllWithPagination(
    pageParam?: number,
    limitParam?: number,
  ): Promise<{ shifts: Shift[] }> {
    const page = pageParam ?? 0;
    const limit = limitParam ?? 10;

    const queryBuilder = this.createQueryBuilder('shift');
    queryBuilder
      .where('is_deleted = false')
      .take(limit)
      .skip(page * limit);

    const shifts = await queryBuilder.getMany();
    return { shifts };
  }
}
