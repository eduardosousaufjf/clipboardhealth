import { Repository } from 'typeorm';
import { Worker } from '../model/worker';
import { CustomRepository } from '../../../commons/custom-repository/typeorm-ex.decorator';
import { WorkerShiftsDto } from '../dto/worker-shifts-dto';
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
  public async findAvailableShiftWithPagination(
    workerIdParam: string,
    facilityIdParam: string,
    shiftStart: string,
    shiftEnd: string,
    pageParam?: string,
    limitParam?: string,
  ): Promise<any> {
    const page = pageParam ? parseInt(pageParam) : 0;
    const limit = limitParam ? parseInt(limitParam) : 10;
    const workerId = parseInt(workerIdParam);
    const facilityId = parseInt(facilityIdParam);

    const startDate = new Date(shiftStart).toISOString();
    const endDate = new Date(shiftEnd).toISOString();

    const queryBuilder = this.createQueryBuilder('wor');
    queryBuilder
      .innerJoin('wor.documents', 'doc', 'doc.id = wor_doc.document_id')
      .innerJoin(
        'FacilityRequirement',
        'facReq',
        'facReq.document_id = wor_doc.document_id',
      )
      .innerJoinAndSelect(
        'Facility',
        'fac',
        'fac.is_active IS TRUE AND fac.id = facReq.facility_id',
      )
      .innerJoinAndSelect(
        'Shift',
        'shi',
        'shi.facility_id = facReq.facility_id AND shi.is_deleted IS FALSE AND shi.worker_id IS NULL AND shi.profession = wor.profession',
      )
      .andWhere(
        'NOT EXISTS (' +
          'SELECT 1 FROM public."Shift" assignedShift ' +
          'WHERE assignedShift.worker_id = wor.id AND assignedShift.start <= shi.start AND assignedShift.end >= shi.end' +
          ')',
      )
      .andWhere('wor.id = :id', { id: workerId })
      .andWhere('fac.id = :facId', { facId: facilityId })
      .andWhere('shi.start >= :shiStart AND shi.end <= :shiEnd', {
        shiStart: startDate,
        shiEnd: endDate,
      })
      .distinctOn(['shi.id', 'shi.start'])
      .orderBy('shi.start', 'ASC')
      .offset(page * limit)
      .limit(limit);

    const result = await queryBuilder.getRawMany();
    return new WorkerShiftsDto(result);
  }
}
