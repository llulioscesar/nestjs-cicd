import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { TaskFactory } from '../factories';
import { LogOperation } from '../decorators';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    @LogOperation('CREATE')
    createTask(title: string, description: string): Task {
        const task = TaskFactory.createTask(title, description);
        this.tasks.push(task);
        return task;
    }

    @LogOperation('READ')
    findAllTasks(): Task[] {
        return this.tasks;
    }

    @LogOperation('READ')
    findTaskById(id: number): Task {
        const task = this.tasks.find(t => t.id === id);
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }

    @LogOperation('UPDATE')
    updateTask(id: number, title: string, description: string, completed: boolean): Task {
        const task = this.findTaskById(id);
        task.title = title;
        task.description = description;
        task.completed = completed;
        return task;
    }

    @LogOperation('DELETE')
    deleteTask(id: number): void {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index === -1) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        this.tasks.splice(index, 1);
    }

}
