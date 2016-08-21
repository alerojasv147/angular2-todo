import {Component, EventEmitter, Input, Output} from "@angular/core";
import {NgClass} from '@angular/common';
import {Todo} from "./todo.model";

@Component({
    moduleId: module.id,
    selector: 'todo-item',
    templateUrl: 'todo-item.html',
    styleUrls: ['todo-item.css'],
    directives: [NgClass]
})

export class TodoItem {
    @Input()
    todo: Todo;

    @Input()
    selected: boolean = false;

    isEditing: boolean = false;

    @Output()
    onDelete = new EventEmitter<Todo>();

    onDragStart(e: any) {
        var target = e.currentTarget;
        e.dataTransfer.effectAllowed = 'move';
        target.style.opacity = '0.4';
    };

    onDragEnd(e: any) {
        var target = e.currentTarget;
        target.style.opacity = '1';
    };

    toggleEdit(element: HTMLInputElement) {
        this.isEditing = !this.isEditing;
        if ( this.isEditing ) {
            setTimeout(() => { element.focus(); }, 0);
        }
    };

    editTodo() {
        this.isEditing = false;
    };

    deleteTodo() {
        this.onDelete.emit(this.todo);
    };
}
