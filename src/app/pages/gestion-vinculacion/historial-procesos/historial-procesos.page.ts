import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial-procesos',
  templateUrl: './historial-procesos.page.html',
  styleUrls: ['./historial-procesos.page.scss'],
})
export class HistorialProcesosPage implements OnInit {
  items = new Array(6); // solo hasta que se obtenga datos de la base
  protected tipos = [
    { id: 1, name: 'Proyectos' },
    { id: 2, name: 'Carreras' }
  ];

  constructor() {}

  ngOnInit() {

  }

}
