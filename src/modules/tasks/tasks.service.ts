import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { TaskFactory } from '../../factories';
import { LogOperation } from '../../decorators';
import Redis from 'ioredis';

@Injectable()
export class TasksService {

    constructor(
        @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
    ) {}

    @LogOperation('CREATE')
    async createTask(title: string, description: string): Promise<Task> {
        const task = TaskFactory.createTask(title, description);
        await this.redisClient.set(`task:${task.id}`, JSON.stringify(task));
        return task;
    }

    @LogOperation('READ')
    async findAllTasks(): Promise<Task[]> {
        const keys = await this.redisClient.keys('task:*');
        if (keys.length === 0) return [];
        
        const tasks = await this.redisClient.mget(...keys);
        return tasks.map(task => JSON.parse(task));
    }

    @LogOperation('READ')
    async findTaskById(id: number): Promise<Task> {
        const task = await this.redisClient.get(`task:${id}`);
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return JSON.parse(task) as Task;
    }

    @LogOperation('UPDATE')
    async updateTask(id: number, title: string, description: string, completed: boolean): Promise<Task> {
        const task = await this.findTaskById(id);
        task.title = title;
        task.description = description;
        task.completed = completed;
        await this.redisClient.set(`task:${id}`, JSON.stringify(task));
        return task;
    }

    @LogOperation('DELETE')
    async deleteTask(id: number): Promise<void> {
        const deleted = await this.redisClient.del(`task:${id}`);
        if (deleted === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }

}
