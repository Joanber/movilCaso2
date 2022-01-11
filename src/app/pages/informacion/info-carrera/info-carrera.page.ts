import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Carrera } from 'src/app/models/carrera.model';
import { SolicitudEmpresa } from 'src/app/models/solicitudEmpresa.model';
import { CarreraService } from 'src/app/services/carrera.service';


@Component({
  selector: 'app-info-carrera',
  templateUrl: './info-carrera.page.html',
  styleUrls: ['./info-carrera.page.scss'],
})
export class InfoCarreraPage implements OnInit {
  
  public carrera: Carrera[] = [];

constructor(private carreraService: CarreraService){}
ngOnInit(): void {
  this.getCarreras();
    
}
//metodo para listar todas las carreras
getCarreras() {
  this.carreraService.getCarreras().subscribe((carrera) => {
    this.carrera = carrera;

    console.log(this.carrera);
  });
}

 }