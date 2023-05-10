import installLogger from './installLogger';
import { INestApplication } from '@nestjs/common';

const logger = jest.fn();

const app: INestApplication = {
  useLogger: jest.fn(),
  get: jest.fn(() => logger),
} as any;
describe('installLogger', () => {
  it('should receive the app and install the logger', () => {
    installLogger(app);
    expect(app.get).toHaveBeenCalledWith(expect.any(Function));
    expect(app.useLogger).toHaveBeenCalledWith(logger);
  });
});
