import { Component } from '@angular/core';

import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public todos: Array<Todo> = [];
  constructor(public todoService: TodoService) {}

  async ngOnInit(){
    this.todos = await this.todoService.read();
  }

  async ionViewWillEnter() {
    this.todos = await this.todoService.read();
  }

  getIcon(todo){
    if(todo.completed) return 'checkmark-circle';
    else return 'stopwatch';
  }
  public async createTodo(){
    let key = await this.todoService.generateKey();
    let todo = {
      title: `${key}`,
      note: "A new todo",
      tags: ["Default"],
      completed: true
    };
    await this.todoService.create(key,todo);
    this.todos = await this.todoService.read();
  }
}
