import { Component, Output, EventEmitter } from '@angular/core';

import { Todo } from '../../../shared/todo.model';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
    selector: 'todo-form',
    templateUrl: './app/components/todos/todo-form/todo-form.component.html',
    styleUrls: ['./app/components/todos/todo-form/todo-form.component.css']
})
export class TodoFormComponent {
    @Output() created: EventEmitter<Todo>;

    constructor() {
        this.created = new EventEmitter<Todo>();
    }

    create(title: string) {
        if (title) {
            let todo = new Todo(title);
            this.created.emit(todo);
        }
    }

    setFilter(title: string){
        TodoListComponent.prototype.FilterWord=title;
    }
}