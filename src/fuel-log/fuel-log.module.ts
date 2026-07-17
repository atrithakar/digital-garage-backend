import { Module } from '@nestjs/common';
import { FuelLogService } from './fuel-log.service';
import { FuelLogController } from './fuel-log.controller';

@Module({
  providers: [FuelLogService],
  controllers: [FuelLogController]
})
export class FuelLogModule {}
