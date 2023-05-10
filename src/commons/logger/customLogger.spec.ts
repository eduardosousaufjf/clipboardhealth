import { CustomLogger } from './customLogger';
import * as fs from 'fs';

jest.mock('fs');

describe('CustomLogger', () => {
  let logger: CustomLogger;

  beforeEach(() => {
    logger = new CustomLogger();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should append error message to error.log file', () => {
    const message = 'test error message';
    const trace = 'test error trace';
    logger.error(message, trace, 'TestContext');
    expect(fs.appendFileSync).toHaveBeenCalledWith(
      'error.log',
      expect.stringContaining(`${message} \n ${trace}\n`),
    );
  });
});
