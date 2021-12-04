import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HistorialProcesosPage } from './historial-procesos.page';



const routes: Routes = [
  {
    path: '',
    component: HistorialProcesosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ], exports: [RouterModule],
  declarations: [HistorialProcesosPage]
})
export class HistorialProcesosPageModule {}
