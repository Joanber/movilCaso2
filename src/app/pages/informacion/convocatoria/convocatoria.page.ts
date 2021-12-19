import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Convocatoria } from 'src/app/models/convocatoria.model';
import { ConvocatoriaService } from 'src/app/services/convocatoria.service';
import { environment } from 'src/environments/environment';
const bd_url = environment.bd_url;
@Component({
  selector: 'app-convocatoria',
  templateUrl: './convocatoria.page.html',
  styleUrls: ['./convocatoria.page.scss'],
})
export class ConvocatoriaPage implements OnInit {
  public convocatoria: Convocatoria[] = [];
  public bd_url = bd_url + "/convocatorias";


  constructor(private convocatoriaService: ConvocatoriaService ){}


  ngOnInit(): void {
   this.getConvocatoriasPage();
  }


 getConvocatoriasPage(){

this.convocatoriaService.getConvocatoriasPage().subscribe((convocatoria)=> {
this.convocatoria=convocatoria;

console.log(this.convocatoria)


});

}

  }
