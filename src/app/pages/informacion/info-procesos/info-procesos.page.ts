import { Component, OnInit } from '@angular/core';
import { Convocatoria } from 'src/app/models/convocatoria.model';
import { ProcesosService } from 'src/app/services/procesos.service';

@Component({
  selector: 'app-info-procesos',
  templateUrl: './info-procesos.page.html',
  styleUrls: ['./info-procesos.page.scss'],
})
export class InfoProcesosPage implements OnInit {
  textoBusqueda: string = '';
  public procesos: Convocatoria[] = [];
  constructor(private procesosService: ProcesosService) { }
  ngOnInit(): void {
    this.getProcesos();
  }

  getProcesos() {
    this.procesosService.getProcesos().subscribe((procesos) => {
      this.procesos = procesos;

      console.log(this.procesos);
    });
  }
  buscar(event: { detail: { value: any; }; }){
    this.textoBusqueda=event.detail.value;
  }
}