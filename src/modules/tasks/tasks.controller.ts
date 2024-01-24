import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto.title, createTaskDto.description);
    }

    @Get()
    async findAllTasks(): Promise<Task[]> {
        return this.tasksService.findAllTasks();
    }

    @Get(':id')
    async findTaskById(@Param('id') id: number): Promise<Task> {
        return this.tasksService.findTaskById(id);
    }

    @Put(':id')
    async updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
        return this.tasksService.updateTask(id, updateTaskDto.title, updateTaskDto.description, updateTaskDto.completed);
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: number): Promise<void> {
        return this.tasksService.deleteTask(id);
    }
}
