import { Test, TestingModule } from '@nestjs/testing';
import { WorkerRepository } from '../repository/worker.repository';
import { WorkerService } from './worker.service';

describe('WorkerService', () => {
  let service: WorkerService;
  let workerRepository: WorkerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkerService,
        {
          provide: WorkerRepository,
          useValue: {
            findAllWithPagination: jest.fn(),
            findAvailableShiftWithPagination: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WorkerService>(WorkerService);
    workerRepository = module.get<WorkerRepository>(WorkerRepository);
  });

  describe('findAllWithPagination', () => {
    it('should call findAllWithPagination of workerRepository with the expected parameters', async () => {
      const pageParam = 1;
      const limitParam = 10;

      await service.findAllWithPagination(pageParam, limitParam);

      expect(workerRepository.findAllWithPagination).toHaveBeenCalledWith(
        pageParam,
        limitParam,
      );
    });
  });

  describe('findShiftsWithPagination', () => {
    it('should call findAvailableShiftWithPagination of workerRepository with the expected parameters', async () => {
      const workerId = '1';
      const facilityId = '2';
      const shiftStart = '2023-05-10T00:00:00.000Z';
      const shiftEnd = '2023-05-11T00:00:00.000Z';
      const pageParam = 1;
      const limitParam = 10;

      await service.findShiftsWithPagination(
        workerId,
        facilityId,
        shiftStart,
        shiftEnd,
        pageParam,
        limitParam,
      );

      expect(
        workerRepository.findAvailableShiftWithPagination,
      ).toHaveBeenCalledWith(
        workerId,
        facilityId,
        shiftStart,
        shiftEnd,
        pageParam,
        limitParam,
      );
    });
  });
});
