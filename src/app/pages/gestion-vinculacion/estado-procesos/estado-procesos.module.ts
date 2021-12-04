import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EstadoProcesosPage } from './estado-procesos.page';



const routes: Routes = [
  {
    path: '',
    component: EstadoProcesosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EstadoProcesosPage]
})
export class EstadoProcesosPageModule {}
