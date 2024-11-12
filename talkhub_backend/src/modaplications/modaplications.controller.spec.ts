import { Test, TestingModule } from '@nestjs/testing';
import { ModaplicationsController } from './modaplications.controller';

describe('ModaplicationsController', () => {
  let controller: ModaplicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModaplicationsController],
    }).compile();

    controller = module.get<ModaplicationsController>(ModaplicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
