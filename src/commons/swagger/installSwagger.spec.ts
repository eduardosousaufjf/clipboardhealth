// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import installSwagger from './installSwagger';

describe('installSwagger', () => {
  let mockApp: any;
  let mockCreateDocument: jest.Mock;
  let mockSetup: jest.Mock;

  beforeEach(() => {
    mockCreateDocument = jest.fn();
    mockSetup = jest.fn();
    mockApp = {
      use: jest.fn(),
    };
    jest
      .spyOn(SwaggerModule, 'createDocument')
      .mockReturnValue(mockCreateDocument);
    jest.spyOn(SwaggerModule, 'setup').mockReturnValue(mockSetup);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should set up Swagger with the correct parameters', () => {
    const config = new DocumentBuilder()
      .setTitle('Clipboard - Take home')
      .setDescription('Candidate challenge - Shift eligibility')
      .setVersion('1.0')
      .addTag('shift')
      .build();

    installSwagger(mockApp);

    expect(SwaggerModule.createDocument).toHaveBeenCalledWith(mockApp, config);
    expect(SwaggerModule.setup).toHaveBeenCalledWith(
      'api',
      mockApp,
      mockCreateDocument,
    );
  });
});
