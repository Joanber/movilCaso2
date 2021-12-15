import { Component, OnInit } from '@angular/core';
import { Carrera, InfocarreraService } from 'src/app/services/infocarrera.service';

//import { Carrera, DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-info-carrera',
  templateUrl: './info-carrera.page.html',
  styleUrls: ['./info-carrera.page.scss'],
})
export class InfoCarreraPage implements OnInit {
  constructor(private db: InfocarreraService) { }
  
  carreraData = {};
   carreras: Carrera[] = [];
   ngOnInit() {
     this.db.getDatabaseState().subscribe(rdy => {
       if (rdy) {
         this.db.getCarreras().subscribe(studs => {
           this.carreras = studs;
           console.log(this.carreras);
         });
       }
     });
   }
   addCarreraDetails() {
     this.db.addCarreraData(this.carreraData['name'], this.carreraData['class'], this.carreraData['mark']).then(_ => {
       this.carreraData = {};
     });
   }
  }




  
  