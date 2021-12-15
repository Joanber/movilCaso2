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

  // procesos = [
  //   { id: '1', estado: 'A tiempo', carrera: 'Tecnología superrior en desarrollo de software', convocatoriaId: '2' },
  //   { id: '2', estado: 'Fuera de tiempo', carrera: 'Tecnología Superior en Mecánica Industrial', convocatoriaId: '3' },
  //   { id: '3', estado: 'A tiempo', carrera: 'Tecnología en Desarrollo Infantil Integral', convocatoriaId: '5' },
  //   { id: '4', estado: 'Fuera de tiempo', carrera: 'Tecnología en Análisis de Sistemas', convocatoriaId: '9' },
  //   { id: '5', estado: 'A tiempo', carrera: 'Tecnología en Seguridad Penitenciaria', convocatoriaId: '8' },
  //   { id: '6', estado: 'Por cumplir el plazo', carrera: 'Tecnología Superior en Electricidad', convocatoriaId: '6' }
  // ];

  items = new Array(6); // solo hasta que se obtenga datos de la base
  data: any;

  ngOnInit() {
    this.sharedService.status$.subscribe(status => this.status = status);
    setTimeout(() => {
      fetch('/assets/data/skeleton.json')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.data = data;
        });
    }, 2500);
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

  ionViewDidLoad() {
    // Simulating network latency
    // with a timeout
    setTimeout(() => {
      fetch('/assets/data/skeleton.json')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.data = data;
        });
    }, 2500);
  }
  // ionViewDidEnter() {
  //   const result = from(this.sharedService.getSkeleton());
  //   result.subscribe(x => console.log(x), e => console.error(e));
  //   // setTimeout(() => {
  //   //   fetch(this.sharedService.getSkeleton()).
  //   // });
  // }
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
