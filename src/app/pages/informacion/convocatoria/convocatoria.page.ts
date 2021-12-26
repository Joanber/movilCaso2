import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, ModalController, NavController } from "@ionic/angular";
import { Convocatoria } from "src/app/models/convocatoria.model";
import { ConvocatoriaService } from "src/app/services/convocatoria.service";
import { environment } from "src/environments/environment";
import { Router } from '@angular/router';
import { DetallePage } from "../detalle/detalle.page";
import { HttpClient } from "@angular/common/http";


@Component({
  selector: "app-convocatoria",
  templateUrl: "./convocatoria.page.html",
  styleUrls: ["./convocatoria.page.scss"],
})
export class ConvocatoriaPage implements OnInit {
  textoBusqueda:string='';
  fechaSelected: any = 1;
  fecha: string = new Date().toISOString();
  tipoServicio:string='id';
  defectSelect:string="Buscar ";
  
  
  public convocatoria: Convocatoria[] = [];

  constructor(private http:HttpClient, private convocatoriaService: ConvocatoriaService, public navCtrl : NavController, public modalCtrl: ModalController,   private alertCtrl: AlertController,   private router: Router) {}



  async verDetalle(id: number){
   const modal = await this.modalCtrl.create({
     component: DetallePage,
     componentProps:{
    id
   }});
 modal.present();


  }



  ngOnInit(): void {
    this.getConvocatorias();
  }

  getConvocatorias() {
    this.convocatoriaService.getConvocatorias().subscribe((convocatoria) => {
      this.convocatoria = convocatoria;

      console.log(this.convocatoria);
    });
  }

cargarConvocatoriaById(id: number) {
  if (!id) {
    return;
  }
  this.convocatoriaService
    .getConvocatoriaById(id)
    .subscribe((convocatoria) => {
      if (!convocatoria) {
        return this.irListaConvocatorias();
      }
      
    });
}
irListaConvocatorias() {
  this.router.navigateByUrl("/informacion/convocatoria");
}

  buscar(event){
    this.textoBusqueda=event.detail.value;
  }

  buscarFecha(event: { detail: { value: any; }; }){
    var dateFormat = event.detail.value.split('T')[0]; 
    console.log(dateFormat);
    this.textoBusqueda=dateFormat;
  }
  async filtroButton() {
    const alert = await this.alertCtrl.create({
      header: 'Metodo de busqueda: ',
      inputs: [
       
        {
          type: 'radio',
          label: 'Nombre Carrera',
          value: 'nombre'
        },
        
        {
          type: 'radio',
          label: 'Fecha maxima de envio solicitud ',
          value: 'fecha_max_recib_solic'
        },
      
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: (data: any) => {
            
          }
        },
        {
          text: 'Listo',
          handler: (data: any) => {
            this.textoBusqueda='';
            
            if(data==="nombre"){
              this.tipoServicio="nombre";
              this.defectSelect="Ingrese el nombre de carrera";
              this.fechaSelected = 1;
            }
           
            if(data==="fecha_max_recib_solic"){
              this.tipoServicio='fecha_max_recib_solic';
              this.defectSelect="Ingrese una fecha";
              this.fechaSelected = 2;
            }
           
          }
        }
      ]
    });
    await alert.present();
  }
}
