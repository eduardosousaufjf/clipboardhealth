import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { GetShiftQueryParams } from './get-shift-query-params';

describe('getShiftQueryParams', () => {
  it('should allow valid page and limit parameters', async () => {
    const queryParams = plainToClass(GetShiftQueryParams, {
      page: 1,
      limit: 10,
    });
    const errors = await validate(queryParams);
    expect(errors).toHaveLength(0);
  });

  it('should allow undefined parameters', async () => {
    const queryParams = plainToClass(GetShiftQueryParams, {});
    const errors = await validate(queryParams);
    expect(errors).toHaveLength(0);
  });

  it('should disallow non-numeric page and limit parameters', async () => {
    const queryParams = plainToClass(GetShiftQueryParams, {
      page: 'foo',
      limit: 'bar',
    });
    const errors = await validate(queryParams);
    expect(errors).toHaveLength(2);
    expect(errors[0].property).toBe('page');
    expect(errors[1].property).toBe('limit');
  });
});
