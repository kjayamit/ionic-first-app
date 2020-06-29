import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Tag } from './tag';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(public storage: Storage) { }

  public async generateKey(): Promise<string>{
    let key = `tag-${ parseInt(`${Math.random() * 100}`)}`;
    let ret = await this.storage.get(key);

    while(ret){
      key = `todo${ parseInt(`${Math.random() * 100}`)}`;
      ret = await this.storage.get(key);
    }
    return key;
  }
  public async read(): Promise<Tag[]>{

    let tags: Array<Tag> = [];
    await this.storage.forEach((v, key, i)=>{
      if(key.startsWith("tag")){
          tags.push(v);
      }
    });

    return tags;
  }

  public async create(key: string , tag: Tag){
    console.log("Creating todo: ", tag);
    return await this.storage.set(key, tag);
  }

  public async update(key: string, tag: Tag){
    return await this.storage.set(key, tag);
  }

  public async delete(key: string){
    return await this.storage.remove(key);
  }
}

