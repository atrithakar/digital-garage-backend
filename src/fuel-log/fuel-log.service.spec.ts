import { Test, TestingModule } from '@nestjs/testing';
import { FuelLogService } from './fuel-log.service';

describe('FuelLogService', () => {
  let service: FuelLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuelLogService],
    }).compile();

    service = module.get<FuelLogService>(FuelLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
