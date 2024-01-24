import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import * as redis from 'redis-mock';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: 'REDIS_CLIENT',
          useValue: redis.createClient(),
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('createTask', () => {
  let service: TasksService;

  const client = redis.createClient();

  beforeEach(() => {
    service = new TasksService(client);
  });

  it('should create a task', async () => {
    const task = await service.createTask('Test Task', 'Test Description');
    expect(task).toBeDefined();
    expect(task.id).toBeDefined();
    expect(task.title).toEqual('Test Task');
    expect(task.description).toEqual('Test Description');
  });

});
