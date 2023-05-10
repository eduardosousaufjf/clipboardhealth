import { INestApplication } from '@nestjs/common';
import installValidationPipe from './installValidationPipe';

describe('installValidationPipe', () => {
  const app: INestApplication = {
    useGlobalPipes: jest.fn(),
  } as any;

  it('should make the application use the validation pipe', () => {
    installValidationPipe(app);
    expect(app.useGlobalPipes).toHaveBeenCalled();
  });
});
