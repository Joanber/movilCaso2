import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-estado-procesos',
  templateUrl: './estado-procesos.page.html',
  styleUrls: ['./estado-procesos.page.scss'],
})
export class EstadoProcesosPage implements OnInit {

  constructor(private sharedService: SharedService, public actionSheetController: ActionSheetController) {}

  protected estados = ['A tiempo', 'Por cumplir el plazo', 'Fuera de tiempo'];
  currentStatus = '';
  currentStyle = { style: {}, name: '', color: ''};
  status: any[] = [];
  items = new Array(6);// solo hasta que se obtenga datos de la base

  ngOnInit() {
    this.sharedService.status$.subscribe(status => this.status = status);
  }

  statusChanged(value: string) {
    this.currentStyle = this.status.find(({ name }) => name === value);
    this.currentStatus = value;
  }

  SetBackground(): object {
    const newColor = {
      'background-color': 'primary',
    };
    return newColor;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Estado',
      cssClass: 'estados',
      buttons: [{
        text: 'A tiempo',
        role: 'destructive',
        cssClass: 'aTiempo',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Por cumplir el plazo',
        cssClass: 'plazoAcumplir',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Fuera de tiempo',
        cssClass: 'fueraTiempo',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
