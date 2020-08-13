import { Component, OnInit } from '@angular/core';
import { 
ModalController, 
NavParams 
} from '@ionic/angular';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.page.html',
  styleUrls: ['./view-note.page.scss'],
})

export class ViewNotePage implements OnInit {

  modalTitle: string;
  modelId: string;
  modelTags: string;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.noteTitle;
    this.modalTitle = this.navParams.data.noteNote;
    this.modelTags = this.navParams.data.noteTags;
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}