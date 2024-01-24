import { Task } from "../modules/tasks/entities";

export class TaskFactory {
    static createTask(title: string, description: string, completed: boolean = false): Task {
        return new Task(title, description, completed);
    }
}