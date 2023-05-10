import { Test } from '@nestjs/testing';
import { ShiftRepository } from '../repository/shift.repository';
import { ShiftService } from './shift.service';
import { Shift } from '../model/shift';

describe('ShiftService', () => {
  let shiftService: ShiftService;
  let shiftRepository: ShiftRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ShiftService,
        {
          provide: ShiftRepository,
          useValue: {
            findAllWithPagination: jest.fn(),
          },
        },
      ],
    }).compile();

    shiftService = moduleRef.get<ShiftService>(ShiftService);
    shiftRepository = moduleRef.get<ShiftRepository>(ShiftRepository);
  });

  describe('findAllWithPagination', () => {
    const shift1 = new Shift();
    shift1.start = new Date().toISOString();
    shift1.end = new Date().toISOString();

    it('should return a list of shifts', async () => {
      const shifts: Shift[] = [shift1];
      jest.spyOn(shiftRepository, 'findAllWithPagination').mockResolvedValue({
        shifts,
      });

      const result = await shiftService.findAllWithPagination();

      expect(result.shifts).toEqual(shifts);
      expect(shiftRepository.findAllWithPagination).toHaveBeenCalled();
    });

    it('should pass the correct parameters to shiftRepository.findAllWithPagination', async () => {
      const pageParam = 1;
      const limitParam = 10;
      jest.spyOn(shiftRepository, 'findAllWithPagination').mockResolvedValue({
        shifts: [],
      });

      await shiftService.findAllWithPagination(pageParam, limitParam);

      expect(shiftRepository.findAllWithPagination).toHaveBeenCalledWith(
        pageParam,
        limitParam,
      );
    });
  });
});
