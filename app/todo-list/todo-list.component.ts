import { Component, OnInit } from '@angular/core';
import { NgForm }    from '@angular/common';

import {Todo} from "../todo-item/todo.model";
import {TodoItem} from "../todo-item/todo-item.component";
import {TodoService} from './todo.service';
import {SortBy} from './sort-by.pipe';

declare var jQuery:any;
@Component({
    moduleId: module.id,
    selector: 'todo-list',
    templateUrl: 'todo-list.html',
    styleUrls: ['todo-list.css'],
    directives: [TodoItem],
    providers: [TodoService],
    pipes: [SortBy]
})

export class TodoList implements OnInit {
    todos: Todo[];
    selectedTodo: Todo = new Todo();
    previousTodo: Todo = null;
    selectedElement: TodoItem;
    dialog:any = {
        "title": "New Task",
        "isNew": true
    };

    constructor(private _todoService:TodoService) {}

    ngOnInit() {
        this.getTodos();
    };

    getTodos() {
        this._todoService.getTodos().then(todos => this.todos = todos);
    };

    onDragEnter(e:any) {
        var target = e.currentTarget;
        if ( this.selectedTodo.status !== target.getAttribute("data-col") ) {
            target.classList.add('over');
        }
    };

    onDragOver(e:any) {
        if (e.preventDefault()) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    };

    onDrop(e:any) {
        var target = e.currentTarget,
            cols   = document.querySelectorAll('.js-col');

        if (e.stopPropagation) {
            e.stopPropagation();
        }
        this.selectedTodo.status = target.getAttribute("data-col");
        this.selectedTodo.lastUpdate = Date.now();
        [].forEach.call(cols, function(col:any) {
            col.classList.remove('over');
        });
        return false;
    };

    onSelect(e:any, todo:Todo) {
        this.selectedElement = e.currentTarget;
        this.selectedTodo = todo;
    };

    showModal(todo:Todo) {
        if ( todo ) {
            this.dialog = {
                "title": todo.name,
                "isNew": false
            };
            this.selectedTodo = JSON.parse(JSON.stringify(todo));
        } else {
            this.dialog = {
                "title": "New Task",
                "isNew": true
            };
            this.selectedTodo = new Todo();
        }
        jQuery('#todo_modal').modal('show');
    };

    saveTodo() {
        if ( this.dialog.isNew ) {
            this.todos.push(this.selectedTodo);
        } else {
            for (var i=0, len = this.todos.length; i < len; i++) {
                if ( this.todos[i].id ===  this.selectedTodo.id ) {
                    this.todos[i] = this.selectedTodo;
                    break;
                }
            }
        }
        jQuery('#todo_modal').modal('hide');
    };

    deleteTodo(todo:Todo) {
        var index = this.todos.indexOf(todo);
        this.todos.splice(index, 1);
    };
}
