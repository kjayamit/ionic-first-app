import { Component, OnInit } from '@angular/core';
import { TagService } from '../tag.service';
import { Tag } from '../tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.page.html',
  styleUrls: ['./tags.page.scss'],
})
export class TagsPage implements OnInit { 

  public tags: Array<Tag> = [];
  constructor(public tagService: TagService) {}

  async ngOnInit(){
    this.tags = await this.tagService.read();
  }

  async ionViewWillEnter() {
    this.tags = await this.tagService.read();
  }

  getIcon(todo){
    return 'checkmark-circle';
  }
}
