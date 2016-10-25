import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ITodo } from '../../../shared/todo.model';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
    selector: 'todo-list',
    templateUrl: './app/components/todos/todo-list/todo-list.component.html',
    styleUrls: ['./app/components/todos/todo-list/todo-list.component.css'],
    directives: [TodoItemComponent]
})
export class TodoListComponent {
    @Input() todos: ITodo[];
    @Output() toggled: EventEmitter<ITodo>;
    @Output() deleted: EventEmitter<ITodo>;
    FilterWord: string;
    
    constructor() {
        this.toggled = new EventEmitter<ITodo>();
        this.deleted = new EventEmitter<ITodo>();
        this.FilterWord="";
    }

    setFilter(title: string){
        this.FilterWord=title;
    }

    get sortedTodos(): ITodo[] {
        return this.todos
            .map((todo:ITodo) => {
                if (todo.title.indexOf(this.FilterWord)>-1){
                //    console.log(todo.title.indexOf(this.FilterWord)+"___"+this.FilterWord)
                    return todo;
                }
            })
            .filter(x=>!!x)
          //.map(((todo.title.indexOf(this.FilterWord)>-1)? todo : null) => todo)
    //        .filter((todo:ITodo) => todo, (TodoItemComponent.prototype.todo.title.indexOf(this.FilterWord)>-1))
    //        .filter(function (todo) {
    //            if (this.FilterWord ==="") {
    //                return true;}
    //            else
     //               if (todo.title.indexOf(this.FilterWord)>-1)
     //                   return true;
      //              else
       //                 return false;
      //          }
      //      )
  //          .sort((a, b) => {
  //              if (a.title > b.title) return 1;
  //              else if (a.title < b.title) return -1;
  //              else return 0;
  //          })
            .sort((a, b) => {
                if (a.done && !b.done) return 1;
                else if (!a.done && b.done) return -1;
                else return 0;
            });
//            .sort((a, b) => {
//                if ((a.title.indexOf(this.FilterWord)) > (b.title.indexOf(this.FilterWord))) return 1;
//                else if ((a.title.indexOf(this.FilterWord)) < (b.title.indexOf(this.FilterWord))) return -1;
//                else return 0;
//            });
    }

    onTodoToggled(todo: ITodo): void {
        this.toggled.emit(todo);
    }

    onTodoDeleted(todo: ITodo): void {
        this.deleted.emit(todo);
    }
}