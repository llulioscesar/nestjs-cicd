import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { CreateTaskDto } from './dto';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;

  const mockRedisClient = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    keys: jest.fn().mockResolvedValue([]),
  };
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: 'REDIS_CLIENT',
          useValue: mockRedisClient,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a task', async () => {
    const newTaskDto: CreateTaskDto = {
      title: 'Test task',
      description: 'Test description',
    };
    expect(await controller.createTask(newTaskDto)).toEqual({
      id: expect.any(Number),
      ...newTaskDto,
      completed: false,
    });
  });

  it('should get all tasks', async () => {
    expect(await controller.findAllTasks()).toEqual([]);
  });

});
