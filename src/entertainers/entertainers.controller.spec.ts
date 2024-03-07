import { Test, TestingModule } from '@nestjs/testing';
import { EntertainersController } from './entertainers.controller';

describe('EntertainersController', () => {
  let controller: EntertainersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntertainersController],
    }).compile();

    controller = module.get<EntertainersController>(EntertainersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
