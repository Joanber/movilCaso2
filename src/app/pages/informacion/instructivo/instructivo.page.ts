import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AnexoService } from 'src/app/services/anexo.service';

@Component({
  selector: 'app-instructivo',
  templateUrl: './instructivo.page.html',
  styleUrls: ['./instructivo.page.scss'],
})
export class InstructivoPage implements OnInit {
  mainForm: FormGroup;
  Data: any[] = [];

  constructor(
    private db: AnexoService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router
  ) {}

//metodo para llamar datos
  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchAnexo().subscribe(item => {
          this.Data = item;
         
        });
      }
    });
//para mostrar 
    this.mainForm = this.formBuilder.group({
      nombre: [''],
      url: [''],
     
    });
  }

  storeData() {
    this.db.addAnexo(
      this.mainForm.value.nombre,
      this.mainForm.value.url,
     
    ).then((res) => {
      this.mainForm.reset();
    });
  }
//metod para eliminar
  deleteAnexo(id) {
    this.db.deleteAnexo(id).then(async (res) => {
      const toast = await this.toast.create({
        message: 'Eliminado',
        duration: 2500
      });
      toast.present();
    });
  }

}
