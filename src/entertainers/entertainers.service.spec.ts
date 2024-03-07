import { Test, TestingModule } from '@nestjs/testing';
import { EntertainersService } from './entertainers.service';

describe('EntertainersService', () => {
  let service: EntertainersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntertainersService],
    }).compile();

    service = module.get<EntertainersService>(EntertainersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
