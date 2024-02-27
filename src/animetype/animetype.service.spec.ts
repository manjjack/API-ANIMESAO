import { Test, TestingModule } from '@nestjs/testing';
import { AnimetypeService } from './animetype.service';

describe('AnimetypeService', () => {
  let service: AnimetypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimetypeService],
    }).compile();

    service = module.get<AnimetypeService>(AnimetypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
