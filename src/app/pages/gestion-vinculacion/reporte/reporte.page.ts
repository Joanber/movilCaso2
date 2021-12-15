import { Component, OnInit } from '@angular/core';
import { actionSheetController, getMode } from '@ionic/core';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss'],
})
export class ReportePage implements OnInit {

  constructor() { }
  mode!: string;
  ngOnInit() {
  }
  open = async () => {
    const mode = getMode();

    const actionSheet = await actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: mode !== 'ios' ? 'trash-outline' : null,
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: mode !== 'ios' ? 'share-outline' : null,
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: mode !== 'ios' ? 'play-circle-outline' : null,
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: mode !== 'ios' ? 'heart-outline' : null,
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: mode !== 'ios' ? 'close' : null,
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
