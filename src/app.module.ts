import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkerModule } from './domain/Worker/worker.module';
import { DatabaseOptions } from './database.options';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftModule } from './domain/Shift/shift.module';

@Module({
  imports: [
    WorkerModule,
    ShiftModule,
    TypeOrmModule.forRootAsync({ useClass: DatabaseOptions }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
