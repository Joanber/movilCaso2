import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, NavController } from "@ionic/angular";
import { Convocatoria } from "src/app/models/convocatoria.model";
import { ConvocatoriaService } from "src/app/services/convocatoria.service";
import { environment } from "src/environments/environment";


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

  constructor(private convocatoriaService: ConvocatoriaService, private alertCtrl: AlertController) {}

  ngOnInit(): void {
    this.getConvocatorias();
  }

  getConvocatorias() {
    this.convocatoriaService.getConvocatorias().subscribe((convocatoria) => {
      this.convocatoria = convocatoria;

      console.log(this.convocatoria);
    });
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
          label: 'Nombre',
          value: 'abreviatura'
        },
        
        {
          type: 'radio',
          label: 'Fecha',
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
            
            if(data==="abreviatura"){
              this.tipoServicio="abreviatura";
              this.defectSelect="Ingrese el nombre";
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
