import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ITodo } from './todo.model';

@Injectable()
export class TodoService {
    private apiUrl = 'api/todos';

    constructor(private http: Http) {}

    getTodos(): Promise<ITodo[]> {
        
        //let LenghTodos=3;
        localStorage.setItem("_LengthTodos","0");
        //localStorage.setItem("_LengthTodos",LenghTodos.toString());
        for (var i=1; i<3; i++){
            //this.post(JSON.parse(localStorage.getItem(i.toString())));
            localStorage.setItem(i.toString(),JSON.stringify(""));
        }
        return this.http.get(this.apiUrl)
                        .toPromise()
                        .then(res => res.json().data)
                        .catch(this.handleError);
        
    }

    addTodo(todo: ITodo): Promise<ITodo> {        
        let LenghTodos=JSON.parse(localStorage.getItem("_LengthTodos"));
        LenghTodos++;
        localStorage.setItem("_LengthTodos",LenghTodos.toString());
        localStorage.setItem(LenghTodos.toString(),JSON.stringify(todo));
        return this.post(todo);
        //localStorage.setItem("t"+LenghTodos.toString(),todo.title);
        //localStorage.setItem("i"+LenghTodos.toString(),todo.id.toString());
        //localStorage.setItem("d"+LenghTodos.toString(),todo.done);
    }

    saveTodo(todo: ITodo): Promise<ITodo> {
        return this.put(todo);
    }

    deleteTodo(todo: ITodo): Promise<ITodo> {
        let LenghTodos=JSON.parse(localStorage.getItem("_LengthTodos"));
        localStorage.removeItem(LenghTodos.toString());
        LenghTodos--;
        localStorage.setItem("_LengthTodos",LenghTodos.toString());
        return this.delete(todo);
    }

    private post(todo: ITodo): Promise<ITodo> {
        let body = JSON.stringify(todo);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers });

        return this.http.post(this.apiUrl, body, options)
                        .toPromise()
                        .then(res => res.json().data)
                        .catch(this.handleError)
    }

    private put(todo: ITodo): Promise<ITodo> {
        let body = JSON.stringify(todo);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers });

        let url = `${this.apiUrl}/${todo.id}`;

        return this.http.put(url, body, options)
                        .toPromise()
                        .then(res => todo)
                        .catch(this.handleError);
    }

    private delete(todo: ITodo): Promise<ITodo> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers });

        let url = `${this.apiUrl}/${todo.id}`;

        return this.http.delete(url, options)
                        .toPromise()
                        .then(res => todo)
                        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.log('Произошла ошибка', error);
        return Promise.reject(error.message || error);
    }
}