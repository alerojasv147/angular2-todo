import { Pipe, PipeTransform } from '@angular/core';

import { Todo } from '../todo-item/todo.model';

@Pipe({
    name: 'sortBy',
    pure: false
})
export class SortBy implements PipeTransform {
    transform(todos: Todo[], sortBy:string) {
        if ( !todos ) {
            return todos;
        }
        todos.sort(function (a: Todo, b:Todo) {
            if (a[sortBy] > b[sortBy]) {
                return 1;
            }
            if (a[sortBy] < b[sortBy]) {
                return -1;
            }
            return 0;
        });

        return todos;
    }
}
