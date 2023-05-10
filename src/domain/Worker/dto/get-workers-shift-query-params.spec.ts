import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { GetWorkersShiftQueryParams } from './get-workers-shift-query-params';

describe('getWorkersShiftQueryParams', () => {
  describe('validation', () => {
    it('should pass validation with valid data', async () => {
      const params = plainToClass(GetWorkersShiftQueryParams, {
        facilityId: 1,
        shiftStart: '2023-05-10T00:00:00.000Z',
        shiftEnd: '2023-05-11T00:00:00.000Z',
      });
      const errors = await validate(params);
      expect(errors.length).toBe(0);
    });

    it('should fail validation with invalid data', async () => {
      const params = plainToClass(GetWorkersShiftQueryParams, {
        facilityId: 'invalid',
        shiftStart: 'invalid',
        shiftEnd: 'invalid',
      });
      const errors = await validate(params);
      expect(errors.length).toBe(3);
    });

    it('should allow page and limit to be optional', async () => {
      const params = plainToClass(GetWorkersShiftQueryParams, {
        facilityId: 1,
        shiftStart: '2023-05-10T00:00:00.000Z',
        shiftEnd: '2023-05-11T00:00:00.000Z',
      });
      expect(params.page).toBeUndefined();
      expect(params.limit).toBeUndefined();
    });
  });
});
