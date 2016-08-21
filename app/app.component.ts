import {Component} from '@angular/core';

import {TodoList} from "./todo-list/todo-list.component";

@Component({
    selector: 'my-app',
    template: `
        <h2 class="title">{{title}}</h2>
        <todo-list></todo-list>
    `,
    directives: [TodoList]
})

export class AppComponent {
    title = 'Todo App with Angular 2'
}
