import { Controller, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities';
import { CreateTaskDto } from './dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto.title, createTaskDto.description);
    }
}
