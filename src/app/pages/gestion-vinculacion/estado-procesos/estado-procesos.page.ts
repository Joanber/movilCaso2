import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-estado-procesos',
  templateUrl: './estado-procesos.page.html',
  styleUrls: ['./estado-procesos.page.scss'],
})
export class EstadoProcesosPage implements OnInit {

  constructor(private sharedService: SharedService) {}
  status: any[] = [];
  ngOnInit() {
    this.sharedService.status$.subscribe(status => this.status = status);
  }

}
