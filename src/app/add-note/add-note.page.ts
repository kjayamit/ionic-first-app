import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { TagService } from '../tag.service';
import { Tag } from '../tag';

import { ToastController } from '@ionic/angular';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage implements OnInit {

  noteForm: FormGroup;
  public todos: Array<Todo> = [];
  public tags: Array<Tag> = [];
  public tagNames: Array<string> = [];
  homePage : HomePage;

  constructor(
    public todoService: TodoService,
    private router: Router,
    public fb: FormBuilder,
    private zone: NgZone,
    public tagService: TagService,
    public toastCtrl: ToastController) { 
      this.noteForm = new FormGroup({
        note_title: new FormControl(''),
        note_note: new FormControl(''),
        note_tags: new FormControl(''),
      });
  }  

  async ngOnInit() {
    this.tags = await this.tagService.read();
    for (var tag of this.tags) {
      this.tagNames.push(tag.name);
    }
  }

  async onFormSubmit() {
    if (!this.noteForm.valid) {
      return false;
    } else {
      let key = await this.todoService.generateKey();

      var a1 = this.noteForm.controls['note_tags'].value.split(" ");
      let missingTagsNames = a1.filter(item => this.tagNames.indexOf(item) < 0);

      for (var missingTagName of missingTagsNames) {
        let tagKey = await this.tagService.generateKey();
        let missingTag = {
          name: `${missingTagName}`
        }
        this.tagService.create(tagKey, missingTag);
      }

      let todo = {
        title: this.noteForm.controls['note_title'].value,
        note: this.noteForm.controls['note_note'].value,
        tags: this.noteForm.controls['note_tags'].value.split(" "),
        // tags: ["Default"],
        completed: true
      };
      await this.todoService.create(key,todo);
      this.router.navigate(['/home']);
    }
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

  async showToast() {
    const toast = await this.toastCtrl.create({
      message: 'Added Note',
      duration: 1000
    });
    await toast.present();
  }

}
