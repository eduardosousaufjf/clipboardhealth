import { TypeOrmModule } from '@nestjs/typeorm';
import { Shift } from './model/shift';
import { TypeOrmExModule } from '../../commons/custom-repository/typeorm-ex.module';
import { Module } from '@nestjs/common';
import { ShiftRepository } from './repository/shift.repository';
import { ShiftService } from './service/shift.service';
import { ShiftController } from './controller/shift.controller';

export const shiftModuleMetadata = {
  imports: [
    TypeOrmModule.forFeature([Shift]),
    TypeOrmExModule.forCustomRepository([ShiftRepository]),
  ],
  providers: [ShiftService],
  controllers: [ShiftController],
};

@Module(shiftModuleMetadata)
export class ShiftModule {}
