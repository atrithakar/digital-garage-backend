import { Test, TestingModule } from '@nestjs/testing';
import { FuelLogController } from './fuel-log.controller';

describe('FuelLogController', () => {
  let controller: FuelLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuelLogController],
    }).compile();

    controller = module.get<FuelLogController>(FuelLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
