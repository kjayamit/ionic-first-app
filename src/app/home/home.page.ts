import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

import { ViewNotePage } from '../modals/view-note/view-note.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public todos: Array<Todo> = [];
  dataReturned: any;
  
  constructor(public todoService: TodoService,
    public modalController: ModalController
    ) {}

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

  async openModal() {
    const modal = await this.modalController.create({
      component: ViewNotePage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }
}
