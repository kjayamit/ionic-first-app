import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage implements OnInit {

  noteForm: FormGroup;
  public todos: Array<Todo> = [];

  constructor(
    public todoService: TodoService,
    private router: Router,
    public fb: FormBuilder,
    private zone: NgZone,
    public toastCtrl: ToastController) { 
      this.noteForm = new FormGroup({
        note_title: new FormControl(''),
        note_note: new FormControl(''),
      });
    }

    

  ngOnInit() {
  }

  async onFormSubmit() {
    if (!this.noteForm.valid) {
      return false;
    } else {
      let key = await this.todoService.generateKey();
      let todo = {
        title: this.noteForm.controls['note_title'].value,
        note: this.noteForm.controls['note_note'].value,
        completed: true
      };
      await this.todoService.create(key,todo);
     this.todos = await this.todoService.read();
     this.router.navigate(['/home']);
        
        // this.showToast
       
    }
  }


  public async createTodo(){
    let key = await this.todoService.generateKey();
    let todo = {
      title: `${key}`,
      note: "A new todo",
      completed: true
    };
    await this.todoService.create(key,todo);
    this.todos = await this.todoService.read();
  }

  async showToast() {
    const toast = await this.toastCtrl.create({
      message: 'Added Note',
      duration: 1000
    });
    await toast.present();
  }

}
