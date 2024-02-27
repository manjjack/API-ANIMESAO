import { Test, TestingModule } from '@nestjs/testing';
import { AnimetypeController } from './animetype.controller';
import { AnimetypeService } from './animetype.service';

describe('AnimetypeController', () => {
  let controller: AnimetypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimetypeController],
      providers: [AnimetypeService],
    }).compile();

    controller = module.get<AnimetypeController>(AnimetypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
