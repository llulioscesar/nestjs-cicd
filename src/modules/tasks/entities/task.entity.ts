export class Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;

    constructor(title: string, description: string, completed: boolean = false) {
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.completed = false;
    }
}