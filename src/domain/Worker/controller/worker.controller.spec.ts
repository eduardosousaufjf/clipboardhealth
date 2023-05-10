import { Test, TestingModule } from '@nestjs/testing';
import { WorkerController } from './worker.controller';
import { WorkerService } from '../service/worker.service';
import { Response } from 'express';
import { GetWorkersQueryParams } from '../dto/get-workers-query-params';
import { GetWorkersShiftQueryParams } from '../dto/get-workers-shift-query-params';
import { Worker } from '../model/worker';

describe('WorkerController', () => {
  let controller: WorkerController;
  let workerService: WorkerService;

  beforeEach(async () => {
    const mockWorkerService = {
      findAllWithPagination: jest.fn(),
      findShiftsWithPagination: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkerController],
      providers: [
        {
          provide: WorkerService,
          useValue: mockWorkerService,
        },
      ],
    }).compile();

    controller = module.get<WorkerController>(WorkerController);
    workerService = module.get<WorkerService>(WorkerService);
  });

  describe('getWorkers', () => {
    it('should return all workers', async () => {
      const worker1 = new Worker();
      worker1.profession = 'CNA';
      worker1.id = 5;
      worker1.name = 'John Doe';
      worker1.is_active = true;
      worker1.documents = [];
      const mockWorkers = [worker1];
      (workerService.findAllWithPagination as jest.Mock).mockReturnValueOnce(
        mockWorkers,
      );

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any as Response;

      const queryParams: GetWorkersQueryParams = {
        page: 1,
        limit: 10,
      };

      await controller.getWorkers(mockResponse, queryParams);

      expect(workerService.findAllWithPagination).toHaveBeenCalledWith(1, 10);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith(mockWorkers);
    });
  });

  describe('getShiftsForWorker', () => {
    it('should return all shifts for a worker', async () => {
      const mockShifts: any[] = [];
      (workerService.findShiftsWithPagination as jest.Mock).mockReturnValueOnce(
        mockShifts,
      );

      const queryParams: GetWorkersShiftQueryParams = {
        page: 1,
        limit: 10,
        facilityId: '1',
        shiftStart: new Date().toISOString(),
        shiftEnd: new Date().toISOString(),
      };

      await controller.getShiftsForWorker('123', queryParams);

      expect(workerService.findShiftsWithPagination).toHaveBeenCalledWith(
        '123',
        '1',
        expect.any(String),
        expect.any(String),
        1,
        10,
      );
    });
  });
});
