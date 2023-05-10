import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkerModule } from './domain/Worker/worker.module';
import { DatabaseOptions } from './database.options';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftModule } from './domain/Shift/shift.module';
import { CustomLogger } from './commons/logger/customLogger';

@Module({
  imports: [
    WorkerModule,
    ShiftModule,
    TypeOrmModule.forRootAsync({ useClass: DatabaseOptions }),
  ],
  controllers: [AppController],
  providers: [AppService, CustomLogger],
})
export class AppModule {}
