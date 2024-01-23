import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('createTask', () => {
  let service: TasksService;

  beforeEach(() => {
    service = new TasksService();
  });

  it('should create a task', () => {
    const task = service.createTask('Test Task', 'Test Description');
    expect(task).toBeDefined();
    expect(task.id).toBeDefined();
    expect(task.title).toEqual('Test Task');
    expect(task.description).toEqual('Test Description');
  });

});
