import { ShiftController } from './shift.controller';
import { ShiftService } from '../service/shift.service';
import { Test } from '@nestjs/testing';
import { ShiftRepository } from '../repository/shift.repository';
import { Shift } from '../model/shift'; // Add this import

describe('shift controller', () => {
  let shiftController: ShiftController;
  let shiftService: ShiftService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ShiftController],
      providers: [
        ShiftService,
        {
          provide: ShiftRepository,
          useValue: {}, // Use a mock version of ShiftRepository here
        },
      ],
    }).compile();
    shiftService = moduleRef.get<ShiftService>(ShiftService);
    shiftController = moduleRef.get<ShiftController>(ShiftController);
  });

  describe('getShifts', () => {
    const shift1 = new Shift();
    shift1.start = new Date().toISOString();
    shift1.end = new Date().toISOString();

    const shifts = [shift1];

    it('should return an empty array when there is no shift', async () => {
      const result: Shift[] = [];
      const promise: Promise<{ shifts: Shift[] }> = new Promise((accept) =>
        accept({ shifts: result }),
      );
      jest
        .spyOn(shiftService, 'findAllWithPagination')
        .mockImplementation(() => promise);
      expect(await shiftController.getShifts({})).toBe(result);
    });

    it('should return an array with one shift when there is a shift', async () => {
      const promise: Promise<{ shifts: Shift[] }> = new Promise((accept) =>
        accept({ shifts }),
      );
      jest
        .spyOn(shiftService, 'findAllWithPagination')
        .mockImplementation(() => promise);
      expect(await shiftController.getShifts({})).toBe(shifts);
    });
  });
});
