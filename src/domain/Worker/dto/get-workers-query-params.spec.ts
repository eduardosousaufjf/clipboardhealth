import { GetWorkersQueryParams } from './get-workers-query-params';
import { validate } from 'class-validator';

describe('GetWorkersQueryParams', () => {
  describe('page', () => {
    it('should validate the page property with a valid number', async () => {
      const query = new GetWorkersQueryParams();
      query.page = 1;

      const errors = await validate(query);

      expect(errors).toHaveLength(0);
    });

    it('should fail validation if the page property is not a number', async () => {
      const query = new GetWorkersQueryParams();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      query.page = 'invalid';

      const errors = await validate(query);

      expect(errors).toHaveLength(1);
      expect(errors[0].constraints).toHaveProperty('isNumber');
    });

    it('should pass validation if the page property is not set', async () => {
      const query = new GetWorkersQueryParams();

      const errors = await validate(query);

      expect(errors).toHaveLength(0);
    });
  });

  describe('limit', () => {
    it('should validate the limit property with a valid number', async () => {
      const query = new GetWorkersQueryParams();
      query.limit = 10;

      const errors = await validate(query);

      expect(errors).toHaveLength(0);
    });

    it('should fail validation if the limit property is not a number', async () => {
      const query = new GetWorkersQueryParams();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      query.limit = 'invalid';

      const errors = await validate(query);

      expect(errors).toHaveLength(1);
      expect(errors[0].constraints).toHaveProperty('isNumber');
    });

    it('should pass validation if the limit property is not set', async () => {
      const query = new GetWorkersQueryParams();

      const errors = await validate(query);

      expect(errors).toHaveLength(0);
    });
  });
});
