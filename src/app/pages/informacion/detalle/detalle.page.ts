import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { actionSheetController, getMode } from '@ionic/core';
import { Convocatoria } from 'src/app/models/convocatoria.model';
import { ConvocatoriaService } from 'src/app/services/convocatoria.service';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  
  public convocatoria: Convocatoria[] = [];

  constructor(private convocatoriaService: ConvocatoriaService) {}

  ngOnInit(): void {
    this.getDetalle();
  }

  getDetalle() {
    this.convocatoriaService.getConvocatorias().subscribe((convocatoria) => {
      this.convocatoria = convocatoria;

      console.log(this.convocatoria);
    });
  }



  
  mode!: string;
 
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