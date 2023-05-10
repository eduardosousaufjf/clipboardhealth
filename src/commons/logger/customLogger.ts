import { ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';
export class CustomLogger extends ConsoleLogger {
  private readonly errorLogFile = 'error.log';

  error(message: string, trace: string, context?: string) {
    const errorMessage = `${new Date().toISOString()} [${context}] ${message} \n ${trace}\n`;
    fs.appendFileSync(this.errorLogFile, errorMessage);
    super.error(message, trace);
  }
}
