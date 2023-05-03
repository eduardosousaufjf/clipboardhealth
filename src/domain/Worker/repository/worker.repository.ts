import { Repository } from 'typeorm';
import { Worker } from '../model/worker';
import { CustomRepository } from '../../../commons/custom-repository/typeorm-ex.decorator';

@CustomRepository(Worker)
export class WorkerRepository extends Repository<Worker> {
  public async findAllWithPagination(
    pageParam?: string,
    limitParam?: string,
  ): Promise<any> {
    const page = pageParam ? parseInt(pageParam) : 0;
    const limit = limitParam ? parseInt(limitParam) : 10;

    const queryBuilder = this.createQueryBuilder('worker');
    queryBuilder
      .where('is_active = true')
      .take(limit)
      .skip(page * limit);

    const workers = await queryBuilder.getMany();
    return { workers };
  }
}
