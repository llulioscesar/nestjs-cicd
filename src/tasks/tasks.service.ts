import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    createTask(title: string, description: string): Task {
        const task = new Task(title, description);
        this.tasks.push(task);
        return task;
    }

}
