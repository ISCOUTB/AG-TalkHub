import { Test, TestingModule } from '@nestjs/testing';
import { ModaplicationsService } from './modaplications.service';

describe('ModaplicationsService', () => {
  let service: ModaplicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModaplicationsService],
    }).compile();

    service = module.get<ModaplicationsService>(ModaplicationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
