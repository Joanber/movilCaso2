import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { InfocarreraService } from 'src/app/services/infocarrera.service';

@Component({
  selector: 'app-info-carrera',
  templateUrl: './info-carrera.page.html',
  styleUrls: ['./info-carrera.page.scss'],
})
export class InfoCarreraPage implements OnInit {
  mainForm: FormGroup;
  Data: any[] = [];

  constructor(
    private db: InfocarreraService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchCarreras().subscribe(item => {
          this.Data = item;
        });
      }
    });

    this.mainForm = this.formBuilder.group({
      nombre: [''],
      coor: [''],
      ppp: ['']
    });
  }

  storeData() {
    this.db.addCarrera(
      this.mainForm.value.nombre,
      this.mainForm.value.coor,
      this.mainForm.value.ppp
    ).then((res) => {
      this.mainForm.reset();
    });
  }

  deleteCarrera(id) {
    this.db.deleteCarrera(id).then(async (res) => {
      const toast = await this.toast.create({
        message: 'Eliminado',
        duration: 2500
      });
      toast.present();
    });
  }

}
