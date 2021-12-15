import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Carrera, InfocarreraService } from 'src/app/services/infocarrera.service';

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.page.html',
  styleUrls: ['./carrera.page.scss'],
})
export class CarreraPage implements OnInit {
  carrera: Carrera = null;
  constructor(private router: Router, private route: ActivatedRoute, private db: InfocarreraService, private toast: ToastController) { }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let caId = params.get('id');

      this.db.getCarreraById(caId).then(data => {
        this.carrera = data;
      });
    });
  }

  updateStudentData() {
    this.db.updateCarrera(this.carrera).then(async (res) => {
      let toast = await this.toast.create({
        message: 'Student Details Updated Successfully..',
        duration: 3000
      });
      toast.present();
    }).then(() => this.router.navigateByUrl('students'));
  }
  delete() {
    console.log('Deleting Student Id '+this.carrera.caId);
    this.db.deleteCarrera(this.carrera.caId).then(() => {
      this.router.navigateByUrl('students');
    });
  }
}