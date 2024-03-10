import { Test, TestingModule } from '@nestjs/testing';
import { EntService } from './entertainers.service';

describe('EntertainersService', () => {
  let service: EntService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntService],
    }).compile();

    service = module.get<EntService>(EntService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
