import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-estado-procesos',
  templateUrl: './estado-procesos.page.html',
  styleUrls: ['./estado-procesos.page.scss'],
})
export class EstadoProcesosPage implements OnInit {

  constructor (private sharedService: SharedService, public actionSheetController: ActionSheetController) {}
  filterListBy$;
  filteredList$;
  protected estados = ['A tiempo', 'Por cumplir el plazo', 'Fuera de tiempo'];
  currentStatus = '';
  currentStyle = { style: {}, name: '', color: '' };
  status: any[] = [];

  procesos = [
    { id: '1', estado: 'A tiempo', carrera: 'Tecnología superrior en desarrollo de software', convocatoriaId: 'A tiempo' },
    { id: '2', estado: 'Fuera de tiempo', carrera: 'Tecnología Superior en Mecánica Industrial', convocatoriaId: 'A tiempo' },
    { id: '3', estado: 'A tiempo', carrera: 'Tecnología en Desarrollo Infantil Integral', convocatoriaId: 'A tiempo' },
    { id: '4', estado: 'Fuera de tiempo', carrera: 'Tecnología en Análisis de Sistemas', convocatoriaId: 'A tiempo' },
    { id: '5', estado: 'A tiempo', carrera: 'Tecnología en Seguridad Penitenciaria', convocatoriaId: 'A tiempo' },
    { id: '6', estado: 'Por cumplir el plazo', carrera: 'Tecnología Superior en Electricidad', convocatoriaId: 'A tiempo' },
    { id: '7', estado: 'Por cumplir el plazo' },
    { id: '8', estado: 'Fuera de tiempo' },
    { id: '9', estado: 'A tiempo' },
    { id: '10', estado: 'A tiempo' },
    { id: '11', estado: 'Fuera de tiempo' },
    { id: '12', estado: 'Por cumplir el plazo' },
    { id: '13', estado: 'Fuera de tiempo' },
    { id: '14', estado: 'A tiempo' },
    { id: '15', estado: 'A tiempo' },
    { id: '16', estado: 'Fuera de tiempo' },
    { id: '17', estado: 'A tiempo' },
    { id: '18', estado: 'Por cumplir el plazo' },
    { id: '19', estado: 'Fuera de tiempo' }
  ];

  items = new Array(6); // solo hasta que se obtenga datos de la base

  ngOnInit() {
    this.sharedService.status$.subscribe(status => this.status = status);
  }

  statusChanged(value?: string) {
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
