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
  @Input() id;
 //public convocatoria: Convocatoria[] = [];
convocatoria: Convocatoria={};
  constructor(private convocatoriaService: ConvocatoriaService, private modalCtrl: ModalController) {}


  ngOnInit() {
 //console.log('ID', this.id)
 this.convocatoriaService.getConvocatoriaById(this.id)
 .subscribe(resp =>  { console.log(resp);
  this.convocatoria = resp;
 },
 err=>{
   console.log(err);
 }
 );
  }

  dismiss(){
    return this.modalCtrl.dismiss({selectedOption:5});
  }



}