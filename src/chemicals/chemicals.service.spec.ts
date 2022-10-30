import { Test, TestingModule } from '@nestjs/testing';
import { ChemicalsService } from './chemicals.service';

describe('ChemicalsService', () => {
  let service: ChemicalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChemicalsService],
    }).compile();

    service = module.get<ChemicalsService>(ChemicalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
