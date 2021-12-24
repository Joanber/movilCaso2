import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { actionSheetController, getMode } from '@ionic/core';
import { Convocatoria } from 'src/app/models/convocatoria.model';
import { ConvocatoriaService } from 'src/app/services/convocatoria.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  @Input() convocatoria: object;
 // public convocatoria: Convocatoria[] = [];

  constructor(private modalCtrl: ModalController) {}


  ngOnInit(): void {
   // this.getDetalle();
  }

  dismiss(){
    return this.modalCtrl.dismiss({selectedOption:5});
  }


/** 
  getDetalle() {
    this.convocatoriaService.getConvocatorias().subscribe((convocatoria) => {
      this.convocatoria = convocatoria;

      console.log(this.convocatoria);
    });
  }
*/

}